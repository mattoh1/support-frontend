package com.gu.support.workers.lambdas

import com.amazonaws.services.lambda.runtime.Context
import com.gu.services.{ServiceProvider, Services}
import com.gu.support.workers.states.StepFunctionUserState
import com.gu.support.workers.{ExecutionError, RequestInfo}
import io.circe.{Decoder, Encoder}

import scala.concurrent.duration._
import scala.concurrent.{ExecutionContext, Future}

abstract class ServicesHandler[IN <: StepFunctionUserState, OUT](servicesProvider: ServiceProvider)(
    implicit
    decoder: Decoder[IN],
    encoder: Encoder[OUT],
    ec: ExecutionContext
) extends Handler[IN, OUT] {

  override protected def handlerFuture(input: IN, error: Option[ExecutionError], requestInfo: RequestInfo, context: Context) = {
    servicesHandler(input, requestInfo, context, servicesProvider.forUser(input.user.isTestUser))
  }

  protected def servicesHandler(input: IN, requestInfo: RequestInfo, context: Context, services: Services): FutureHandlerResult

}
