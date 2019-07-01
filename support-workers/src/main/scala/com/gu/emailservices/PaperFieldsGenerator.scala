package com.gu.emailservices

import com.gu.i18n.Currency
import com.gu.salesforce.Salesforce.SfContactId
import com.gu.support.promotions.Promotion
import com.gu.support.workers._
import org.joda.time.LocalDate

//noinspection ScalaStyle
object PaperFieldsGenerator {

  def fieldsFor(
    subscriptionNumber: String,
    billingPeriod: BillingPeriod,
    user: User,
    paymentSchedule: PaymentSchedule,
    firstDeliveryDate: Option[LocalDate],
    currency: Currency,
    paymentMethod: PaymentMethod,
    sfContactId: SfContactId,
    directDebitMandateId: Option[String],
    promotion: Option[Promotion]
  ): List[(String, String)] = {

    val firstPaymentDate = SubscriptionEmailFieldHelpers.firstPayment(paymentSchedule).date

    val paymentFields = getPaymentFields(paymentMethod, directDebitMandateId)

    val deliveryAddressFields = getAddressFields(user)

    val fields = List(
      "ZuoraSubscriberId" -> subscriptionNumber,
      "SubscriberKey" -> user.primaryEmailAddress,
      "EmailAddress" -> user.primaryEmailAddress,
      "subscriber_id" -> subscriptionNumber,
      "first_name" -> user.firstName,
      "last_name" -> user.lastName,
      "date_of_first_paper" -> SubscriptionEmailFieldHelpers.formatDate(firstDeliveryDate.getOrElse(firstPaymentDate)),
      "date_of_first_payment" -> SubscriptionEmailFieldHelpers.formatDate(firstPaymentDate),
      "subscription_rate" -> SubscriptionEmailFieldHelpers.describe(paymentSchedule, billingPeriod, currency, promotion)
    ) ++ paymentFields ++ deliveryAddressFields

    fields
  }

  protected def getAddressFields(user: User)= {
    val address = user.deliveryAddress.getOrElse(user.billingAddress)

    List(
      "delivery_address_line_1" -> address.lineOne.getOrElse(""),
      "delivery_address_line_2" -> address.lineTwo.getOrElse(""),
      "delivery_address_town" -> address.city.getOrElse(""),
      "delivery_postcode" -> address.postCode.getOrElse(""),
      "delivery_country" -> address.country.name
    )
  }

  protected def getPaymentFields(paymentMethod: PaymentMethod, directDebitMandateId: Option[String]) = paymentMethod match {
    case dd: DirectDebitPaymentMethod => List(
      "bank_account_no" -> SubscriptionEmailFieldHelpers.mask(dd.bankTransferAccountNumber),
      "bank_sort_code" -> SubscriptionEmailFieldHelpers.hyphenate(dd.bankCode),
      "account_holder" -> dd.bankTransferAccountName,
      "payment_method" -> "Direct Debit",
      "mandate_id" -> directDebitMandateId.getOrElse("")
    )
    case dd: ClonedDirectDebitPaymentMethod => List(
      "bank_account_no" -> SubscriptionEmailFieldHelpers.mask(dd.bankTransferAccountNumber),
      "bank_sort_code" -> SubscriptionEmailFieldHelpers.hyphenate(dd.bankCode),
      "account_holder" -> dd.bankTransferAccountName,
      "payment_method" -> "Direct Debit",
      "mandate_id" -> dd.mandateId
    )
    case _: CreditCardReferenceTransaction => List("payment_method" -> "Credit/Debit Card")
    case _: PayPalReferenceTransaction => List("payment_method" -> "PayPal")
  }

}