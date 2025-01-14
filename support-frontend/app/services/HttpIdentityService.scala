package services

import java.net.URI

import cats.data.EitherT
import cats.implicits._
import com.google.common.net.InetAddresses
import com.gu.identity.model.{PrivateFields, User => IdUser}
import com.gu.monitoring.SafeLogger
import com.gu.monitoring.SafeLogger._
import config.Identity
import io.circe.Encoder
import io.circe.generic.semiauto.deriveEncoder
import models.identity.UserIdWithGuestAccountToken
import models.identity.requests.CreateGuestAccountRequestBody
import models.identity.responses.{GuestRegistrationResponse, SetGuestPasswordResponseCookies, UserResponse}
import play.api.libs.json.{Json, Reads}
import play.api.libs.ws.{WSClient, WSRequest, WSResponse}
import play.api.mvc.RequestHeader

import scala.concurrent.duration._
import scala.concurrent.{ExecutionContext, Future}
import scala.util.Try

object IdentityServiceEnrichers {

  implicit class EnrichedList[A, B](underlying: List[(A, Option[B])]) {
    def flattenValues: List[(A, B)] = underlying.collect {
      case (k, Some(v)) => (k, v)
    }
  }

  implicit class EnrichedRequest(request: RequestHeader) {
    def clientIp: Option[String] = {
      request.headers.get("X-Forwarded-For").flatMap { xForwardedFor =>
        xForwardedFor.split(", ").find(publicIpAddress)
      }
    }

    private def publicIpAddress(address: String) =
      Try { InetAddresses.forString(address) }.exists(!_.isSiteLocalAddress)
  }

  implicit class EnrichedResponse(response: WSResponse) {
    def success: Boolean = response.status / 100 == 2
  }
}

case class GetUserTypeResponse(userType: String)
object GetUserTypeResponse {
  implicit val readsGetUserTypeResponse: Reads[GetUserTypeResponse] = Json.reads[GetUserTypeResponse]
  implicit val getUserTypeEncoder: Encoder[GetUserTypeResponse] = deriveEncoder
}

case class CreateSignInTokenResponse(encryptedEmail: String)
object CreateSignInTokenResponse {
  implicit val readCreateSignInTokenResponse: Reads[CreateSignInTokenResponse] = Json.reads[CreateSignInTokenResponse]
}

object IdentityService {
  def apply(config: Identity)(implicit wsClient: WSClient): IdentityService =
    new IdentityService(apiUrl = config.apiUrl, apiClientToken = config.apiClientToken)
}

class IdentityService(apiUrl: String, apiClientToken: String)(implicit wsClient: WSClient) {

  import IdentityServiceEnrichers._

  private def request(path: String): WSRequest = {
    wsClient.url(s"$apiUrl/$path")
      .withHttpHeaders("Authorization" -> s"Bearer $apiClientToken")
  }

  def sendConsentPreferencesEmail(email: String)(implicit ec: ExecutionContext): Future[Boolean] = {
    val payload = Json.obj("email" -> email, "set-consents" -> Json.arr("supporter"))
    request(s"consent-email").post(payload).map { response =>
      val validResponse = response.status >= 200 && response.status < 300
      if (validResponse) SafeLogger.info("Successful response from Identity Consent API")
      else SafeLogger.error(scrub"Failure response from Identity Consent API: ${response.toString}")
      validResponse
    } recover {
      case e: Exception =>
        SafeLogger.error(scrub"Failed to update the user's marketing preferences $e")
        false
    }
  }

  def getUserType(
    email: String
  )(implicit ec: ExecutionContext): EitherT[Future, String, GetUserTypeResponse] = {
    request(s"user/type/$email")
      .get
      .attemptT
      .leftMap(_.toString)
      .subflatMap(resp => resp.json.validate[GetUserTypeResponse].asEither.leftMap(_.mkString(",")))
  }

  def setPasswordGuest(
    password: String,
    guestAccountRegistrationToken: String
  )(implicit ec: ExecutionContext): EitherT[Future, String, SetGuestPasswordResponseCookies] = {
    val payload = Json.obj("password" -> password)
    val headers =
      List("X-Guest-Registration-Token" -> guestAccountRegistrationToken, "Content-Type" -> "application/json")
    request(s"guest/password")
      .addHttpHeaders(headers: _*)
      .put(payload)
      .attemptT
      .leftMap(_.toString)
      .subflatMap(resp => (resp.json \ "cookies").validate[SetGuestPasswordResponseCookies].asEither.leftMap(_.mkString(",")))
  }

  def createSignInToken(
    email: String
  )(implicit ec: ExecutionContext): EitherT[Future, String, CreateSignInTokenResponse] = {
    val payload = Json.obj("email" -> email)
    request(s"signin-token/email")
      .post(payload)
      .attemptT
      .leftMap(_.toString)
      .subflatMap(resp => resp.json.validate[CreateSignInTokenResponse].asEither.leftMap(_.mkString(",")))
  }

  private def getHeaders(request: RequestHeader): List[(String, String)] = List(
    "X-GU-ID-Client-Access-Token" -> Some(s"Bearer $apiClientToken"),
    "X-GU-ID-FOWARDED-SC-GU-U" -> request.cookies.get("SC_GU_U").map(_.value),
    "Authorization" -> request.headers.get("GU-IdentityToken")
  ).flattenValues

  private def postHeaders(request: RequestHeader): List[(String, String)] = List(
    "X-GU-ID-Client-Access-Token" -> Some(s"Bearer $apiClientToken"),
    "Content-Type" -> Some("application/json")
  ).flattenValues

  private def trackingParameters(request: RequestHeader): List[(String, String)] = List(
    "trackingReferer" -> request.headers.get("Referer"),
    "trackingUserAgent" -> request.headers.get("User-Agent"),
    "trackingIpAddress" -> request.clientIp
  ).flattenValues

  def getUser(user: IdMinimalUser)(implicit req: RequestHeader, ec: ExecutionContext): EitherT[Future, String, IdUser] = {
    import com.gu.identity.model.play.ReadsInstances.userReads
    get(s"user/${user.id}", getHeaders(req), trackingParameters(req)) { resp =>
      (resp.json \ "user").validate[IdUser].asEither.leftMap(_.mkString(","))
    }
  }

  def getUserIdFromEmail(email: String)(implicit req: RequestHeader, ec: ExecutionContext): EitherT[Future, String, UserIdWithGuestAccountToken] = {
    get(s"user", getHeaders(req), List("emailAddress" -> email)) { resp =>
      resp.json.validate[UserResponse].asEither.map(
        userResponse => UserIdWithGuestAccountToken(userResponse.user.id, None)
      ).leftMap(_.mkString(","))
    }
  }

  def createUserIdFromEmailUser(
    email: String,
    firstName: String,
    lastName: String
  )(implicit req: RequestHeader, ec: ExecutionContext): EitherT[Future, String, UserIdWithGuestAccountToken] = {
    val body = CreateGuestAccountRequestBody(
      email,
      PrivateFields(
        firstName = Some(firstName).filter(_.nonEmpty),
        secondName = Some(lastName).filter(_.nonEmpty)
      )
    )
    execute(
      wsClient.url(s"$apiUrl/guest")
        .withHttpHeaders(postHeaders(req): _*)
        .withBody(body)
        .withRequestTimeout(1.second)
        .withMethod("POST")
    ) { resp =>
        resp.json.validate[GuestRegistrationResponse]
          .asEither
          .bimap(_.mkString(","), response => UserIdWithGuestAccountToken.fromGuestRegistrationResponse(response))
      }
  }

  def getOrCreateUserIdFromEmail(
    email: String,
    firstName: String,
    lastName: String
  )(implicit req: RequestHeader, ec: ExecutionContext): EitherT[Future, String, UserIdWithGuestAccountToken] = {
    getUserIdFromEmail(email).leftFlatMap(_ => createUserIdFromEmailUser(email, firstName, lastName))
  }

  private def get[A](
    endpoint: String,
    headers: List[(String, String)],
    parameters: List[(String, String)]
  )(func: WSResponse => Either[String, A])(implicit ec: ExecutionContext) = {
    execute(
      wsClient.url(s"$apiUrl/$endpoint")
        .withHttpHeaders(headers: _*)
        .withQueryStringParameters(parameters: _*)
        .withRequestTimeout(1.second)
        .withMethod("GET")
    )(func)
  }

  private def uriWithoutQuery(uri: URI) = uri.toString.takeWhile(_ != '?')

  private def execute[A](requestHolder: WSRequest)(func: (WSResponse) => Either[String, A])(implicit ec: ExecutionContext) = {
    EitherT.right(requestHolder.execute()).subflatMap {
      case r if r.success =>
        func(r)
      case r =>
        Left(s"Identity API error: ${requestHolder.method} ${uriWithoutQuery(requestHolder.uri)} STATUS ${r.status}")
    }
  }
}
