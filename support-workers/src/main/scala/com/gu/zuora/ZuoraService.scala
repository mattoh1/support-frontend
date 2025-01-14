package com.gu.zuora

import java.time.format.DateTimeFormatter
import java.time.{LocalDate, OffsetDateTime}

import cats.data.OptionT
import cats.implicits._
import com.gu.okhttp.RequestRunners.FutureHttpClient
import com.gu.rest.WebServiceHelper
import com.gu.support.config.ZuoraConfig
import com.gu.support.workers.IdentityId
import com.gu.support.zuora.api.response._
import com.gu.support.zuora.api.{PreviewSubscribeRequest, QueryData, SubscribeRequest}
import com.gu.support.zuora.domain.{DomainAccount, DomainSubscription}
import io.circe
import io.circe.Decoder
import io.circe.parser.decode
import io.circe.syntax._

import scala.concurrent.{ExecutionContext, Future}

class ZuoraService(val config: ZuoraConfig, client: FutureHttpClient, baseUrl: Option[String] = None)(implicit ec: ExecutionContext)
    extends WebServiceHelper[ZuoraErrorResponse] {

  override val wsUrl: String = baseUrl.getOrElse(config.url)
  override val httpClient: FutureHttpClient = client
  val authHeaders = Map(
    "apiSecretAccessKey" -> config.password,
    "apiAccessKeyId" -> config.username
  )

  def getAccount(accountNumber: String): Future[GetAccountResponse] =
    get[GetAccountResponse](s"accounts/$accountNumber", authHeaders)

  def getAccountFields(identityId: IdentityId, now: OffsetDateTime): Future[List[DomainAccount]] = {
    val recentDays = 28 // the step functions only try for 1 day, so 28 would be ample to find subs already created in this execution
    val recently = now.minusDays(recentDays).format(DateTimeFormatter.ISO_ZONED_DATE_TIME)
    // WARNING constructing queries from strings is inherently dangerous.  Be very careful.
    val queryData = QueryData(
      s"select AccountNumber, CreatedRequestId__c from account where IdentityId__c = '${identityId.value}' and UpdatedDate > '$recently'"
    )
    postJson[AccountQueryResponse](s"action/query", queryData.asJson, authHeaders).map(_.records.map(DomainAccount.fromAccountRecord))
  }

  def getObjectAccount(accountId:String): Future[GetObjectAccountResponse] =
    get[GetObjectAccountResponse](s"object/account/$accountId", authHeaders)

  def getSubscriptions(accountNumber: ZuoraAccountNumber): Future[List[DomainSubscription]] =
    get[SubscriptionsResponse](s"subscriptions/accounts/${accountNumber.value}", authHeaders).map { subscriptionsResponse =>
      subscriptionsResponse.subscriptions.map(DomainSubscription.fromSubscription)
    }

  def previewSubscribe(previewSubscribeRequest: PreviewSubscribeRequest): Future[List[PreviewSubscribeResponse]] =
    postJson[List[PreviewSubscribeResponse]]("action/subscribe", previewSubscribeRequest.asJson, authHeaders)

  def subscribe(subscribeRequest: SubscribeRequest): Future[List[SubscribeResponseAccount]] =
    postJson[List[SubscribeResponseAccount]]("action/subscribe", subscribeRequest.asJson, authHeaders)

  def getPaymentMethod(paymentMethodId: String): Future[GetPaymentMethodResponse] =
    get[GetPaymentMethodResponse](s"object/payment-method/$paymentMethodId", authHeaders)

  def getDefaultPaymentMethodId(accountNumber: String): Future[Option[String]] = {
    // WARNING constructing queries from strings is inherently dangerous.  Be very careful.
    val queryData = QueryData(s"select defaultPaymentMethodId from Account where AccountNumber = '$accountNumber'")
    postJson[PaymentMethodQueryResponse](s"action/query", queryData.asJson, authHeaders)
      .map(r => Some(r.records.head.DefaultPaymentMethodId))
      .fallbackTo(Future.successful(None))
  }

  def getDirectDebitMandateId(paymentMethodId: String): Future[Option[String]] = {
    get[PaymentMethodDetailResponse](s"object/payment-method/$paymentMethodId", authHeaders)
      .map(p => Some(p.MandateID))
      .fallbackTo(Future.successful(None))
  }

  def getMandateIdFromAccountNumber(accountNumber: String): Future[Option[String]] = {
    (for {
      pmId <- OptionT(getDefaultPaymentMethodId(accountNumber))
      ddId <- OptionT(getDirectDebitMandateId(pmId))
    } yield ddId).value
  }

  override def decodeError(responseBody: String)(implicit errorDecoder: Decoder[ZuoraErrorResponse]): Either[circe.Error, ZuoraErrorResponse] =
    //The Zuora api docs say that the subscribe action returns
    //a ZuoraErrorResponse but actually it returns a list of those.
    decode[List[ZuoraErrorResponse]](responseBody).map(_.head)

}
