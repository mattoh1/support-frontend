package com.gu.zuora.encoding

import com.gu.helpers.StringExtensions._
import com.gu.i18n.Currency.GBP
import com.gu.i18n.{Country, CountryGroup, Currency}
import com.gu.support.workers.model.{CreditCardReferenceTransaction, PayPalReferenceTransaction, PaymentMethod}
import com.gu.zuora.encoding.CapitalizationEncoder._
import com.gu.zuora.model._
import io.circe._
import org.joda.time.{DateTime, LocalDate}

object CustomCodecs extends CustomCodecs

trait CustomCodecs {
  //Request encoders
  implicit val encodeCurrency: Encoder[Currency] = Encoder.encodeString.contramap[Currency](_.iso)
  //Encodes a Currency as its iso code eg. {"Currency": "GBP"}
  implicit val encodePaymentGateway: Encoder[PaymentGateway] = Encoder.encodeString.contramap[PaymentGateway](_.name)
  implicit val encodeCountryAsAlpha2: Encoder[Country] = Encoder.encodeString.contramap[Country](_.alpha2)

  //Account object encoding - unfortunately the custom field name of the Salesforce contact id starts with a lower case
  //letter whereas all the other fields start with upper case so we need to set it explicitly
  private val salesforceIdName = "sfContactId__c"
  private def decapitalizeSfContactId(fieldName: String) =
    if (fieldName == salesforceIdName.capitalize) salesforceIdName.decapitalize
    else fieldName

  implicit val encodeAccount: Encoder[Account] = capitalizingEncoder[Account].mapJsonObject(modifyFields(_)(decapitalizeSfContactId))

  implicit val encodeSubscribeOptions: Encoder[SubscribeOptions] = capitalizingEncoder[SubscribeOptions]
  implicit val encodeSubscribeResponseAccount: Encoder[SubscribeResponseAccount] = capitalizingEncoder[SubscribeResponseAccount]
  implicit val encodeInvoice: Encoder[Invoice] = capitalizingEncoder[Invoice]
  implicit val encodeInvoiceResult: Encoder[InvoiceResult] = capitalizingEncoder[InvoiceResult]
  implicit val encodeSubscriptionProductFeature: Encoder[SubscriptionProductFeature] = capitalizingEncoder[SubscriptionProductFeature]
  implicit val encodeRatePlanCharge: Encoder[RatePlanCharge] = capitalizingEncoder[RatePlanCharge]
  implicit val encodeRatePlanChargeData: Encoder[RatePlanChargeData] = capitalizingEncoder[RatePlanChargeData]
  implicit val encodeRatePlan: Encoder[RatePlan] = capitalizingEncoder[RatePlan]
  implicit val encodeRatePlanData: Encoder[RatePlanData] = capitalizingEncoder[RatePlanData]
  implicit val encodeSubscription: Encoder[Subscription] = capitalizingEncoder[Subscription]
  implicit val encodeSubscriptionData: Encoder[SubscriptionData] = capitalizingEncoder[SubscriptionData]
  implicit val encodeContactDetails: Encoder[ContactDetails] = capitalizingEncoder[ContactDetails]
  implicit val encodeSubscribeItem: Encoder[SubscribeItem] = capitalizingEncoder[SubscribeItem]

  //We need to serialise PaymentMethod using the subtype to avoid nesting (see CirceEncodingBehaviourSpec)
  implicit val encodePaymentMethod: Encoder[PaymentMethod] = new Encoder[PaymentMethod] {
    override final def apply(a: PaymentMethod) = a match {
      case p: PayPalReferenceTransaction => capitalizingEncoder[PayPalReferenceTransaction].apply(p)
      case c: CreditCardReferenceTransaction => capitalizingEncoder[CreditCardReferenceTransaction].apply(c)
    }
  }

  //Encode joda LocalDate to the format expected by Zuora
  implicit val encodeLocalTime: Encoder[LocalDate] = Encoder.encodeString.contramap[LocalDate](_.toString("yyyy-MM-dd"))
  implicit val decodeDateTime: Decoder[DateTime] = Decoder.decodeLong.map(new DateTime(_))

  //response decoders
  implicit val decodeInvoice: Decoder[Invoice] = decapitalizingDecoder[Invoice]
  implicit val decodeInvoiceResult: Decoder[InvoiceResult] = decapitalizingDecoder[InvoiceResult]
  implicit val decodeSubscribeResponseAccount: Decoder[SubscribeResponseAccount] = decapitalizingDecoder[SubscribeResponseAccount]
  implicit val decodeCurrency: Decoder[Currency] = Decoder.decodeString.map(Currency.fromString(_).getOrElse(GBP))
  implicit val decodeCountry: Decoder[Country] = Decoder.decodeString.map(CountryGroup.countryByCode(_).getOrElse(Country.UK))
}