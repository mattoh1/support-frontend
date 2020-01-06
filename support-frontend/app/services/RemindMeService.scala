package services

import com.amazonaws.regions.Regions
import com.amazonaws.services.lambda.AWSLambdaClientBuilder
import com.amazonaws.services.lambda.model.InvokeRequest
import com.gu.monitoring.SafeLogger
import com.gu.support.config.{Stage, Stages}
import controllers.ReminderEventRequest
import play.api.libs.json.Json

import scala.concurrent.{ExecutionContext, Future}

class RemindMeService(stage: Stage) {

  private val lambdaClient = AWSLambdaClientBuilder
    .standard()
    .withRegion(Regions.EU_WEST_1.getName)
    .withCredentials(aws.CredentialsProvider)
    .build()

  private val functionName = stage match {
    case Stages.PROD => "contributions-reminders-lambda-PROD"
    case _ => "contributions-reminders-lambda-CODE"
  }

  private val expectedResponse = """"statusCode":200,"body":"\"OK\"""""

  def apply(reminderEventRequest: ReminderEventRequest)(implicit ec: ExecutionContext): Future[Boolean] = {
    val lambdaPayload = contructPayload(reminderEventRequest)
    val request = new InvokeRequest()
      .withFunctionName(functionName)
      .withPayload(lambdaPayload)

    val res = lambdaClient.invoke(request)
    val responseBody = new String(res.getPayload.array())
    val isSuccessResponse = responseBody.contains(expectedResponse)

    if (!isSuccessResponse) SafeLogger.warn(s"Got ${responseBody} for function: ${functionName} with request: ${lambdaPayload}")

    Future(isSuccessResponse)
  }

  def contructPayload(reminderEventRequest: ReminderEventRequest): String = {
    val payloadBody = Json.obj("email" -> reminderEventRequest.email, "reminderDate" -> reminderEventRequest.reminderDate)
    // TO DO: remove "ReminderCreatedEvent" -> payloadBody" when the new lambda is in Production
    Json.obj("ReminderCreatedEvent" -> payloadBody, "body" -> payloadBody.toString()).toString
  }
}
