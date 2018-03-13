package monitoring

import akka.actor.ActorSystem
import services.stepfunctions.RegularContributionsClient
import scala.concurrent.duration._
import scala.util.{Failure, Success}
import SafeLogger._

class StateMachineMonitor(client: RegularContributionsClient, actorSystem: ActorSystem) {

  val cloudwatchMetricsPattern = "regular-contributions-state-machine-unavailable"

  def start(): Unit = {
    implicit val ec = actorSystem.dispatcher
    actorSystem.scheduler.schedule(5.seconds, 60.seconds) {
      client.healthy().onComplete {
        case Success(true) => SafeLogger.debug("Regular contributions state machine is healthy")
        case Success(false) => SafeLogger.error(scrub"Regular contributions state machine is not available [$cloudwatchMetricsPattern]")
        case Failure(exception) => SafeLogger.error(
          scrub"Exception while fetching regular contributions state machine status [$cloudwatchMetricsPattern]", exception
        )
      }
    }
  }
}
