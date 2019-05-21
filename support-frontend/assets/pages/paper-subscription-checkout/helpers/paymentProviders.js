// @flow

import { showStripe } from 'helpers/paymentProviders';
import { type IsoCurrency } from 'helpers/internationalisation/currency';
import {
  type PaymentAuthorisation,
  type PaymentResult,
  postRegularPaymentRequest,
  regularPaymentFieldsFromAuthorisation,
  type RegularPaymentRequest,
} from 'helpers/paymentIntegrations/readerRevenueApis';
import { type Dispatch } from 'redux';
import { openDirectDebitPopUp } from 'components/directDebit/directDebitActions';
import { routes } from 'helpers/routes';
import { getQueryParameter } from 'helpers/url';
import { getOphanIds, getSupportAbTests } from 'helpers/tracking/acquisitions';
import { Monthly } from 'helpers/billingPeriods';

import { type Action, setFormSubmitted, setStage, setSubmissionError } from 'helpers/subscriptionsForms/formActions';
import type { PaymentMethod } from 'helpers/paymentMethods';
import { DirectDebit, Stripe } from 'helpers/paymentMethods';

import { type Csrf } from 'helpers/csrf/csrfReducer';
import type { Participations } from 'helpers/abTests/abtest';
import { type Option } from 'helpers/types/option';
import type { WithDeliveryCheckoutState } from 'helpers/subscriptionsForms/subscriptionCheckoutReducer';
import {
  getBillingAddressFields,
  getDeliveryAddressFields,
} from 'helpers/subscriptionsForms/subscriptionCheckoutReducer';

function buildRegularPaymentRequest(
  state: WithDeliveryCheckoutState,
  paymentAuthorisation: PaymentAuthorisation,
): RegularPaymentRequest {
  const { currencyId } = state.common.internationalisation;
  const {
    firstName,
    lastName,
    email,
    telephone,
    billingAddressIsSame,
  } = state.page.checkout;

  const product = {
    currency: currencyId,
    billingPeriod: Monthly,
    fulfilmentOptions: state.page.checkout.fulfilmentOption,
    productOptions: state.page.checkout.productOption,
  };

  const paymentFields = regularPaymentFieldsFromAuthorisation(paymentAuthorisation);

  const deliveryAddress = getDeliveryAddressFields(state);

  const billingAddress = billingAddressIsSame ? deliveryAddress : getBillingAddressFields(state);
  return {
    firstName,
    lastName,
    billingAddress,
    deliveryAddress,
    email,
    telephoneNumber: telephone,
    product,
    firstDeliveryDate: state.page.checkout.startDate,
    paymentFields,
    ophanIds: getOphanIds(),
    referrerAcquisitionData: state.common.referrerAcquisitionData,
    supportAbTests: getSupportAbTests(state.common.abParticipations, state.common.optimizeExperiments),
    promoCode: getQueryParameter('promoCode'),
  };
}

function onPaymentAuthorised(
  dispatch: Dispatch<Action>,
  data: RegularPaymentRequest,
  csrf: Csrf,
  abParticipations: Participations,
) {
  const handleSubscribeResult = (result: PaymentResult) => {
    if (result.paymentStatus === 'success') {
      if (result.subscriptionCreationPending) {
        dispatch(setStage('thankyou-pending'));
      } else {
        dispatch(setStage('thankyou'));
      }
    } else { dispatch(setSubmissionError(result.error)); }
  };

  dispatch(setFormSubmitted(true));

  postRegularPaymentRequest(
    routes.subscriptionCreate,
    data,
    abParticipations,
    csrf,
    () => {},
    () => {},
  ).then(handleSubscribeResult);
}

function showPaymentMethod(
  dispatch: Dispatch<Action>,
  onAuthorised: (pa: PaymentAuthorisation) => void,
  isTestUser: boolean,
  price: number,
  currency: IsoCurrency,
  paymentMethod: Option<PaymentMethod>,
  email: string,
): void {

  switch (paymentMethod) {
    case Stripe:
      showStripe(onAuthorised, isTestUser, price, currency, email);
      break;
    case DirectDebit:
      dispatch(openDirectDebitPopUp());
      break;
    case null:
    case undefined:
      console.log('Undefined payment method');
      break;
    default:
      console.log(`Unknown payment method ${paymentMethod}`);
  }
}

export { showPaymentMethod, onPaymentAuthorised, buildRegularPaymentRequest };
