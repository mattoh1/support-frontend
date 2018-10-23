package com.gu.support.workers

import cats.implicits._
import com.gu.monitoring.SafeLogger
import com.gu.support.workers.lambdas.IdentityId
import com.gu.support.workers.model.AccountAccessScope.{SessionAccess, AuthenticatedAccess, SessionId}
import com.gu.support.workers.model.{AccountAccessScope, BillingPeriod}
import com.gu.zuora.GetAccountForIdentity.{CreatedInSession, DomainAccount, ExistingContributionSessionId}
import com.gu.zuora.GetSubscription.DomainSubscription
import com.gu.zuora.ZuoraConfig.RatePlanId
import com.gu.zuora.ZuoraService
import com.gu.zuora.model.response.RatePlan

import scala.concurrent.{ExecutionContext, Future}

object GetRecurringSubscription {

  def apply(
    zuoraService: ZuoraService,
    accessScope: AccountAccessScope,
    identityId: IdentityId,
    billingPeriod: BillingPeriod
  )(implicit ec: ExecutionContext): Future[Option[DomainSubscription]] = {

    val productRatePlanId: RatePlanId = zuoraService.config.contributionConfig(billingPeriod).productRatePlanId

    val hasContributorPlan: List[RatePlan] => Boolean = GetRecurringSubscription.hasContributorPlan(productRatePlanId)

    def isAccountAccessAllowed(domainAccount: DomainAccount): Boolean =
      IsAccountAccessAllowed(accessScope, domainAccount.existingAccountSessionId)
        .withLogging(s"isInScope, access scope: $accessScope, account: $domainAccount")

    for {
      accountIds <- zuoraService.getAccountFields(identityId)
      inScopeAccountIds = accountIds.filter(isAccountAccessAllowed).map(_.accountNumber)
      subscriptions <- inScopeAccountIds.map(zuoraService.getSubscriptions).combineAll
      maybeRecentContributor = subscriptions.find(sub => hasContributorPlan(sub.ratePlans) && sub.isActive.value)
    } yield maybeRecentContributor
  }

  def hasContributorPlan(ratePlanId: RatePlanId)(ratePlans: List[RatePlan]): Boolean =
    ratePlans.exists(_.productRatePlanId == ratePlanId)

  implicit class LogImplicit[A](op: A) {

    def withLogging(message: String): A = {
      SafeLogger.info(s"$message: result: $op")
      op
    }

  }

}

object IsAccountAccessAllowed {

  def apply(accessScope: AccountAccessScope, existingAccountSessionId: ExistingContributionSessionId): Boolean = {
    (accessScope, existingAccountSessionId) match {
      case (AuthenticatedAccess, _) => true
      case (SessionAccess(currentSessionId), CreatedInSession(existingSubSession)) if currentSessionId == existingSubSession => true
      case _ => false
    }
  }

}
