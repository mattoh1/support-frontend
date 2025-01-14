package selenium.subscriptions

import org.openqa.selenium.WebDriver
import org.scalatest.concurrent.Eventually
import org.scalatest.featurespec.AnyFeatureSpec
import org.scalatest.time.{Minute, Seconds, Span}
import org.scalatest.{BeforeAndAfter, BeforeAndAfterAll, GivenWhenThen}
import selenium.subscriptions.pages._
import selenium.util._

class CheckoutsSpec extends AnyFeatureSpec
  with GivenWhenThen
  with BeforeAndAfter
  with BeforeAndAfterAll
  with Browser
  with Eventually {

  val driverConfig = new DriverConfig
  override implicit val webDriver: WebDriver = driverConfig.webDriver

  override implicit val patienceConfig: PatienceConfig = PatienceConfig(Span(1, Minute), Span(5, Seconds))

  before {
    driverConfig.reset()
  }

  override def beforeAll(): Unit = {
    Config.printSummary(driverConfig.sessionId)
    Dependencies.dependencyCheck
  }

  override def afterAll(): Unit = {
    driverConfig.quit()
  }

   Feature("Digital Pack checkout") {
     Scenario("Stripe checkout") {
       testCheckout("Digital Pack", new DigitalPackCheckout, new DigitalPackProductPage, payWithStripe)
     }
   }

  Feature("Paper checkout") {
    Scenario("Direct Debit checkout") {
      testCheckout("Paper", new PaperCheckout, new PaperProductPage, payWithDirectDebit)
    }
  }

  Feature("Guardian Weekly checkout") {
    Scenario("Direct Debit checkout") {
      testCheckout("Guardian Weekly", new GuardianWeeklyCheckout, new WeeklyProductPage, payWithDirectDebit)
    }
  }

  Feature("Guardian Weekly gift checkout") {
    Scenario("Stripe checkout") {
      testCheckout("Guardian Weekly gift", new GuardianWeeklyGiftCheckout, new WeeklyGiftProductPage, payWithStripe)
    }
  }

  def testCheckout(checkoutName: String, checkoutPage: CheckoutPage, productPage: ProductPage, paymentFunction: CheckoutPage => Unit): Unit = {
    val testUser = new PostDeployTestUser(driverConfig)

    Given("that a user goes to the UK product page")
    goTo(productPage)

    Given(s"that a user goes to the $checkoutName checkout page")
    goTo(checkoutPage)

    Then("they should be redirected to register as an Identity user")
    val register = Register(testUser, "digital")
    assert(register.firstPageHasLoaded)

    Given("that the user fills in their email address")
    register.fillInEmail()

    When("they click the next button")
    register.next()

    Then("they should be taken to the second register page")
    assert(register.secondPageHasLoaded)

    Given("that the user fills in the rest of their details")
    register.fillInPersonalDetails()

    When("they click the create account button")
    register.createAccount()

    Then(s"they should be redirected to the $checkoutName checkout page")
    assert(checkoutPage.pageHasLoaded)

    Given("The user fills in their details correctly")
    checkoutPage.fillForm()

    paymentFunction(checkoutPage)
  }

  def payWithStripe(checkoutPage: CheckoutPage): Unit ={
    Given("that the user selects to pay with Stripe")
    When("they press the Stripe payment button")
    checkoutPage.selectStripePaymentMethod()

    Then("the stripe form loads")
    assert(checkoutPage.stripeFormHasLoaded)

    Given("they fill in the stripe form")
    checkoutPage.fillStripeForm()

    When("they click to process payment")
    checkoutPage.clickStripeSubmit()

    And("the mock calls the backend using a test Stripe token")
    thankYouPage(checkoutPage)
  }

  def payWithDirectDebit(checkoutPage: CheckoutPage): Unit ={

    Given("that the user selects to pay with Direct Debit")
    When("they press the Direct Debit payment button")
    checkoutPage.selectDirectDebitPaymentMethod()

    Then("the direct debit form loads")
    assert(checkoutPage.directDebitFormHasLoaded)

    Given("they fill in the direct debit form")
    checkoutPage.fillDirectDebitForm()

    When("they click to process payment")
    checkoutPage.clickDirectDebitSubmit()

    Given("the playback of the user's details has loaded")
    assert(checkoutPage.directDebitPlaybackHasLoaded)

    When("they click to confirm their details are correct")
    checkoutPage.clickDirectDebitConfirm()

    thankYouPage(checkoutPage)
  }

  def thankYouPage(checkoutPage: CheckoutPage): Unit ={
    Then("the thank you page should display")
    eventually {
      assert(checkoutPage.thankYouPageHasLoaded)
    }
  }
}
