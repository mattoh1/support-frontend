// @flow
import { logException } from 'helpers/logger';
import { type PaymentMethod, Stripe } from 'helpers/paymentMethods';

export const setupStripe = (setStripeHasLoaded: () => void) => {
  if (window.Stripe) {
    setStripeHasLoaded();
  } else {
    const htmlElement = document.getElementById('stripe-js');
    if (htmlElement !== null) {
      htmlElement.addEventListener(
        'load',
        setStripeHasLoaded,
      );
    } else {
      logException('Failed to find stripe-js element, cannot initialise Stripe Elements');
    }
  }
};
export const stripeCardFormIsIncomplete = (
  paymentMethod: PaymentMethod,
  stripeCardFormComplete: boolean,
): boolean =>
  paymentMethod === Stripe &&
  !(stripeCardFormComplete);
