// @flow

/**
 * This module contains a copy of pages/oneoff-contributions/helpers/ajax so that
 * the new payment flow can use this code without any impact on the existing
 * infrastructure.
 *
 * There are a couple of differences though:
 * - the amount: instead of fixing it when the callback is created, it should
 *   be provided by the `getState` function
 * - the actions: what happens upon error/success is view-dependent, so the
 *   actions are provided as parameters too. As a result, `dispatch` can
 *   go away (which makes the module completely independant of React)
 * - tracking conversions: this should be decoupled from the payment itself and
 *   moved upstream, in the success handler
 *
 * The latter module can be removed entirely once the new payment flow becomes the one
 * and only contribution endpoint.
 */

import { type IsoCurrency } from 'helpers/internationalisation/currency';
import type { StripeCheckoutAuthorisation } from 'helpers/paymentIntegrations/readerRevenueApis';
import type { IsoCountry } from 'helpers/internationalisation/country';
import { Stripe } from 'helpers/paymentMethods';
import type { ContributionType } from 'helpers/contributions';

// ----- Types ----- //

export type StripeAccount = 'ONE_OFF' | 'REGULAR';

const stripeAccountForContributionType: {[ContributionType]: StripeAccount } = {
  ONE_OFF: 'ONE_OFF',
  MONTHLY: 'REGULAR',
  ANNUAL: 'REGULAR',
};

// ----- Functions ----- //

function loadStripe(): Promise<void> {
  if (!window.StripeCheckout) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');

      script.onload = resolve;
      script.onerror = reject;
      script.src = 'https://checkout.stripe.com/checkout.js';

      if (document.head) {
        document.head.appendChild(script);
      }
    });
  }
  return Promise.resolve();

}

function getStripeKey(stripeAccount: StripeAccount, country: IsoCountry, isTestUser: boolean): string {
  switch (country) {
    case 'AU':
      return isTestUser ?
        window.guardian.stripeKeyAustralia[stripeAccount].uat :
        window.guardian.stripeKeyAustralia[stripeAccount].default;
    case 'US':
      return isTestUser ?
        window.guardian.stripeKeyUnitedStates[stripeAccount].uat :
        window.guardian.stripeKeyUnitedStates[stripeAccount].default;
    default:
      return isTestUser ?
        window.guardian.stripeKeyDefaultCurrencies[stripeAccount].uat :
        window.guardian.stripeKeyDefaultCurrencies[stripeAccount].default;
  }
}

function setupStripeCheckout(
  onPaymentAuthorisation: StripeCheckoutAuthorisation => void,
  stripeAccount: StripeAccount,
  currency: IsoCurrency,
  country: IsoCountry,
  isTestUser: boolean,
): Object {
  const handleToken = (token) => {
    onPaymentAuthorisation({ paymentMethod: Stripe, token: token.id, stripePaymentMethod: 'StripeCheckout' });
  };

  const stripeKey = getStripeKey(stripeAccount, country, isTestUser);

  return window.StripeCheckout.configure({
    name: 'Guardian',
    description: 'Please enter your card details.',
    allowRememberMe: false,
    key: stripeKey,
    image: 'https://uploads.guim.co.uk/2018/01/15/gu.png',
    locale: 'auto',
    currency,
    token: handleToken,
  });
}

export {
  loadStripe,
  setupStripeCheckout,
  getStripeKey,
  stripeAccountForContributionType,
};
