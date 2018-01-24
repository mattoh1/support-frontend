package com.gu.zuora.encoding

import java.util.UUID

import com.gu.helpers.StringExtensions._
import com.gu.i18n.{Country, CountryGroup, Currency}
import com.gu.support.workers.encoding.Codec
import com.gu.support.workers.encoding.Helpers.{capitalizingCodec, deriveCodec}
import com.gu.support.workers.model._
import com.gu.support.workers.model.monthlyContributions.Contribution
import io.circe._
import io.circe.generic.semiauto._
import org.joda.time.{DateTime, LocalDate}

import scala.util.Try

object CustomCodecs extends CustomCodecs with InternationalisationCodecs with ModelsCodecs with HelperCodecs

trait InternationalisationCodecs {
  implicit val encodeCurrency: Encoder[Currency] = Encoder.encodeString.contramap[Currency](_.iso)

  implicit val decodeCurrency: Decoder[Currency] =
    Decoder.decodeString.emap { code => Currency.fromString(code).toRight(s"Unrecognised currency code '$code'") }

  implicit val encodeCountryAsAlpha2: Encoder[Country] = Encoder.encodeString.contramap[Country](_.alpha2)
  implicit val decodeCountry: Decoder[Country] =
    Decoder.decodeString.emap { code => CountryGroup.countryByCode(code).toRight(s"Unrecognised country code '$code'") }
}

trait ModelsCodecs {
  self: CustomCodecs with InternationalisationCodecs with HelperCodecs =>

  implicit val payPalReferenceTransactionCodec: Codec[PayPalReferenceTransaction] = capitalizingCodec
  implicit val creditCardReferenceTransactionCodec: Codec[CreditCardReferenceTransaction] = capitalizingCodec
  implicit val directDebitPaymentMethodCodec: Codec[DirectDebitPaymentMethod] = capitalizingCodec

  //Payment Methods are details from the payment provider
  //noinspection ConvertExpressionToSAM
  implicit val encodePaymentMethod: Encoder[PaymentMethod] = new Encoder[PaymentMethod] {
    override final def apply(a: PaymentMethod): Json = a match {
      case p: PayPalReferenceTransaction => Encoder[PayPalReferenceTransaction].apply(p)
      case c: CreditCardReferenceTransaction => Encoder[CreditCardReferenceTransaction].apply(c)
      case d: DirectDebitPaymentMethod => directDebitPaymentMethodCodec.apply(d)
    }
  }

  implicit val decodePaymentMethod: Decoder[PaymentMethod] =
    Decoder[PayPalReferenceTransaction].map(x => x: PaymentMethod).or(
      Decoder[CreditCardReferenceTransaction].map(x => x: PaymentMethod).or(
        Decoder[DirectDebitPaymentMethod].map(x => x: PaymentMethod)
      )
    )

  //Payment fields are input from support-frontend
  implicit val payPalPaymentFieldsCodec: Codec[PayPalPaymentFields] = deriveCodec
  implicit val stripePaymentFieldsCodec: Codec[StripePaymentFields] = deriveCodec
  implicit val directDebitPaymentFieldsCodec: Codec[DirectDebitPaymentFields] = deriveCodec

  //noinspection ConvertExpressionToSAM
  implicit val encodePaymentFields: Encoder[PaymentFields] = new Encoder[PaymentFields] {
    override final def apply(a: PaymentFields): Json = a match {
      case p: PayPalPaymentFields => Encoder[PayPalPaymentFields].apply(p)
      case s: StripePaymentFields => Encoder[StripePaymentFields].apply(s)
      case d: DirectDebitPaymentFields => Encoder[DirectDebitPaymentFields].apply(d)
    }
  }

  implicit val decodePaymentFields: Decoder[PaymentFields] =
    Decoder[PayPalPaymentFields].map(x => x: PaymentFields).or(
      Decoder[StripePaymentFields].map(x => x: PaymentFields).or(
        Decoder[DirectDebitPaymentFields].map(x => x: PaymentFields)
      )
    )

  implicit val decodePeriod: Decoder[BillingPeriod] =
    Decoder.decodeString.emap(code => BillingPeriod.fromString(code).toRight(s"Unrecognised period code '$code'"))
  implicit val encodePeriod: Encoder[BillingPeriod] = Encoder.encodeString.contramap[BillingPeriod](_.toString)

  implicit val codecUser: Codec[User] = deriveCodec

  //There is a configuration option in Circe to allow the use of Scala default parameters, but unfortunately
  //it doesn't seem to work in version 0.8.0 so we'll have to use this more verbose approach
  implicit val decodeContribution: Decoder[Contribution] = Decoder
    .forProduct3("amount", "currency", "billingPeriod")(Contribution.apply)
    .or(Decoder.forProduct2("amount", "currency")((a: BigDecimal, c: Currency) => Contribution(a, c)))
  implicit val encodeContribution: Encoder[Contribution] = deriveEncoder

  implicit val executionErrorCodec: Codec[ExecutionError] = deriveCodec

  implicit val RequestInfoCodec: Codec[RequestInfo] = deriveCodec

  implicit val jsonWrapperDecoder: Codec[JsonWrapper] = deriveCodec

  implicit val jsonWrapperEncoder: Encoder[JsonWrapper] = deriveEncoder

  implicit val acquisitionDataCodec: Codec[AcquisitionData] = {
    import com.gu.acquisition.instances.abTest._
    deriveCodec
  }

}

trait HelperCodecs {
  implicit val encodeLocalTime: Encoder[LocalDate] = Encoder.encodeString.contramap(_.toString("yyyy-MM-dd"))
  implicit val decodeLocalTime: Decoder[LocalDate] = Decoder.decodeString.map(LocalDate.parse)
  implicit val encodeDateTime: Encoder[DateTime] = Encoder.encodeLong.contramap(_.getMillis)
  implicit val decodeDateTime: Decoder[DateTime] = Decoder.decodeLong.map(new DateTime(_))
  implicit val uuidDecoder: Decoder[UUID] = Decoder.decodeString.emap(code => Try(UUID.fromString(code)).toOption.toRight(s"Invalid UUID '$code'"))
  implicit val uuidEncoder: Encoder[UUID] = Encoder.encodeString.contramap(_.toString)
}

trait CustomCodecs {
  //Request encoders
  //Account object encoding - unfortunately the custom field name of the Salesforce contact id starts with a lower case
  //letter whereas all the other fields start with upper case so we need to set it explicitly
  private val salesforceIdName = "sfContactId__c"

  def decapitalizeSfContactId(fieldName: String): String =
    if (fieldName == salesforceIdName.capitalize) salesforceIdName.decapitalize
    else fieldName
}