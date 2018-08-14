package codecs

import cats.syntax.either._
import codecs.CirceDecoders._
import com.gu.acquisition.model.{OphanIds, ReferrerAcquisitionData}
import com.gu.support.workers.model.DirectDebitPaymentFields
import io.circe.parser.parse
import models.CheckBankAccountDetails
import ophan.thrift.componentEvent.ComponentType.{AcquisitionsEpic, EnumUnknownComponentType}
import ophan.thrift.event.AbTest
import ophan.thrift.event.AcquisitionSource.GuardianWeb
import org.scalatest.{MustMatchers, WordSpec}
class CirceDecodersTest extends WordSpec with MustMatchers {

  "referrerAcquisitionDataCodec" should {
    "decode json" in {
      val json =
        """
          |{
          |   "campaignCode":"example",
          |   "referrerPageviewId": "j8jza3155r9ye3wmfll1",
          |   "abTest": {
          |      "name":"test_1",
          |      "variant":"variant_34"
          |    },
          |    "source": "GUARDIAN_WEB",
          |    "componentId": "example_component_id",
          |    "componentType": "ACQUISITIONS_EPIC"
          |}
        """
          .stripMargin

      val parsedJson = parse(json).toOption.get

      val referrerAcquisitionData: ReferrerAcquisitionData = referrerAcquisitionDataCodec.decodeJson(parsedJson).right.get

      referrerAcquisitionData.campaignCode.get mustBe "example"
      referrerAcquisitionData.abTest.get.name mustBe "test_1"
      referrerAcquisitionData.abTest.get.variant mustBe "variant_34"
      referrerAcquisitionData.abTest.get.complete mustBe None
      referrerAcquisitionData.source.get mustBe GuardianWeb
      referrerAcquisitionData.componentId mustBe Some("example_component_id")
      referrerAcquisitionData.componentType mustBe Some(AcquisitionsEpic)
      referrerAcquisitionData.referrerPageviewId mustBe Some("j8jza3155r9ye3wmfll1")

      val json2 =
        """
          |{
          |    "componentType": "InvalidType"
          |}
        """
          .stripMargin

      val parsedJson2 = parse(json2).toOption.get

      val referrerAcquisitionData2: ReferrerAcquisitionData = referrerAcquisitionDataCodec.decodeJson(parsedJson2).right.get

      referrerAcquisitionData2.componentType mustBe Some(EnumUnknownComponentType(-1))

    }
  }

  "ophanIdsCodec" should {
    "decode json" in {
      val json =
        """
          |{
          |   "browserId":"abc123",
          |   "pageviewId":"def456",
          |   "visitId":"ghi789"
          |}
        """
          .stripMargin

      val parsedJson = parse(json).toOption.get

      val ophanIds: OphanIds = ophanIdsCodec.decodeJson(parsedJson).right.get

      ophanIds.pageviewId mustBe Some("def456")
      ophanIds.browserId mustBe Some("abc123")
      ophanIds.visitId mustBe Some("ghi789")
    }
  }

  "AbTestDecoder" should {
    "decode json" in {
      val json =
        """
          |{
          |  "name":"test_1",
          |  "variant":"variant_34"
          |}
        """
          .stripMargin

      val parsedJson = parse(json).toOption.get

      val abtest: AbTest = abTestDecoder.decodeJson(parsedJson).right.get

      abtest.name mustBe "test_1"
      abtest.variant mustBe "variant_34"
    }
  }

  "DirectDebitDataDecoder" should {
    "decode json" in {
      val json =
        """
        |{
        |   "sortCode": "121212",
        |   "accountNumber": "12121212",
        |   "accountHolderName": "Example Name"
        |}
      """.stripMargin

      val parsedJson = parse(json).toOption.get

      val directDebitData: DirectDebitPaymentFields = directDebitPaymentFieldsCodec.decodeJson(parsedJson).right.get

      directDebitData.sortCode mustBe "121212"
      directDebitData.accountNumber mustBe "12121212"
      directDebitData.accountHolderName mustBe "Example Name"
    }
  }

  "CheckBankAccountDecoder" should {
    "decode json" in {
      val json =
        """
          |{
          |   "sortCode": "121212",
          |   "accountNumber": "12121212"
          |}
        """.stripMargin

      val parsedJson = parse(json).toOption.get

      val checkBankAccountData: CheckBankAccountDetails = CheckBankAccountDetails.codec.decodeJson(parsedJson).right.get

      checkBankAccountData.sortCode.value mustBe "121212"
      checkBankAccountData.accountNumber.value mustBe "12121212"
    }
  }
}
