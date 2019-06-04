// @flow

// ----- Imports ----- //

import React from 'react';
import { connect } from 'react-redux';

import { type ThirdPartyPaymentLibrary, getPaymentLabel, getValidPaymentMethods } from 'helpers/checkouts';
import { type Switches } from 'helpers/settings';
import {
  type ContributionType, contributionTypeIsRecurring,
  type ThirdPartyPaymentLibraries,
} from 'helpers/contributions';
import { classNameWithModifiers } from 'helpers/utilities';
import { type IsoCountry } from 'helpers/internationalisation/country';
import { type IsoCurrency } from 'helpers/internationalisation/currency';
import { type PaymentAuthorisation } from 'helpers/paymentIntegrations/readerRevenueApis';
import SvgNewCreditCard from 'components/svgs/newCreditCard';
import SvgPayPal from 'components/svgs/paypal';
import SvgDirectDebitSymbol from 'components/svgs/directDebitSymbol';
import GeneralErrorMessage from 'components/generalErrorMessage/generalErrorMessage';

import { type State } from '../contributionsLandingReducer';
import type { PaymentMethod } from 'helpers/paymentMethods';
import { DirectDebit, PayPal } from 'helpers/paymentMethods';
import {
  type Action,
  updatePaymentMethod,
  setThirdPartyPaymentLibrary,
  updateSelectedExistingPaymentMethod,
} from '../contributionsLandingActions';
import { isUsableExistingPaymentMethod } from 'helpers/existingPaymentMethods/existingPaymentMethods';
import type {
  ExistingPaymentMethod,
  RecentlySignedInExistingPaymentMethod,
} from 'helpers/existingPaymentMethods/existingPaymentMethods';
import { getReauthenticateUrl } from 'helpers/externalLinks';
import AnimatedDots from 'components/spinners/animatedDots';
import { ExistingCard, ExistingDirectDebit, Stripe } from '../../../helpers/paymentMethods';
import {
  getExistingPaymentMethodLabel,
  mapExistingPaymentMethodToPaymentMethod,
  subscriptionsToExplainerList,
  subscriptionToExplainerPart,
} from '../../../helpers/existingPaymentMethods/existingPaymentMethods';


// ----- Types ----- //

/* eslint-disable react/no-unused-prop-types */
type PropTypes = {|
  countryId: IsoCountry,
  contributionType: ContributionType,
  currency: IsoCurrency,
  existingPaymentMethods: ExistingPaymentMethod[] | typeof undefined,
  paymentMethod: PaymentMethod,
  existingPaymentMethod: RecentlySignedInExistingPaymentMethod,
  onPaymentAuthorisation: PaymentAuthorisation => void,
  thirdPartyPaymentLibraries: ThirdPartyPaymentLibraries,
  updatePaymentMethod: PaymentMethod => Action,
  updateSelectedExistingPaymentMethod: (RecentlySignedInExistingPaymentMethod | typeof undefined) => Action,
  setThirdPartyPaymentLibrary: (?{ [ContributionType]: { [PaymentMethod]: ThirdPartyPaymentLibrary }}) => Action,
  isTestUser: boolean,
  switches: Switches,
|};
/* eslint-enable react/no-unused-prop-types */

const mapStateToProps = (state: State) => ({
  countryId: state.common.internationalisation.countryId,
  currency: state.common.internationalisation.currencyId,
  contributionType: state.page.form.contributionType,
  existingPaymentMethods: state.common.existingPaymentMethods,
  paymentMethod: state.page.form.paymentMethod,
  existingPaymentMethod: state.page.form.existingPaymentMethod,
  thirdPartyPaymentLibraries: state.page.form.thirdPartyPaymentLibraries,
  isTestUser: state.page.user.isTestUser || false,
  switches: state.common.settings.switches,
});

const mapDispatchToProps = {
  updatePaymentMethod,
  updateSelectedExistingPaymentMethod,
  setThirdPartyPaymentLibrary,
};

// ----- Render ----- //

function getPaymentMethodLogo(paymentMethod: PaymentMethod) {
  switch (paymentMethod) {
    case PayPal:
      return <SvgPayPal />;
    case DirectDebit:
    case ExistingDirectDebit:
      return <SvgDirectDebitSymbol />;
    case Stripe:
    case ExistingCard:
    default:
      return <SvgNewCreditCard />;
  }
}

function PaymentMethodSelector(props: PropTypes) {

  const paymentMethods: PaymentMethod[] =
    getValidPaymentMethods(props.contributionType, props.switches, props.countryId);

  const noPaymentMethodsErrorMessage =
    (<GeneralErrorMessage
      classModifiers={['no-valid-payments']}
      errorHeading="Payment methods are unavailable"
      errorReason="all_payment_methods_unavailable"
    />);

  // having to do this nasty cast because Flow sucks and type guards don't work through .filter
  const fullExistingPaymentMethods: RecentlySignedInExistingPaymentMethod[] =
    ((props.existingPaymentMethods || []).filter(isUsableExistingPaymentMethod): any);

  return (
    <fieldset className={classNameWithModifiers('form__radio-group', ['buttons', 'contribution-pay'])}>
      <legend className="form__legend">Payment method</legend>

      { paymentMethods.length ?
        <ul className="form__radio-group-list">
          {contributionTypeIsRecurring(props.contributionType) && !props.existingPaymentMethods && (
          <div className="awaiting-existing-payment-options">
            <AnimatedDots appearance="medium" />
          </div>
            )
          }
          {contributionTypeIsRecurring(props.contributionType) &&
          fullExistingPaymentMethods.map((existingPaymentMethod: RecentlySignedInExistingPaymentMethod) => (
            <li className="form__radio-group-item">
              <input
                id={`paymentMethodSelector-existing${existingPaymentMethod.billingAccountId}`}
                className="form__radio-group-input"
                name="paymentMethodSelector"
                type="radio"
                value={existingPaymentMethod}
                onChange={() => {
                    props.updatePaymentMethod(mapExistingPaymentMethodToPaymentMethod(existingPaymentMethod));
                    props.updateSelectedExistingPaymentMethod(existingPaymentMethod);
                  }}
                checked={
                    props.paymentMethod === mapExistingPaymentMethodToPaymentMethod(existingPaymentMethod) &&
                    props.existingPaymentMethod === existingPaymentMethod
                  }
              />
              <label
                htmlFor={`paymentMethodSelector-existing${existingPaymentMethod.billingAccountId}`}
                className="form__radio-group-label has-existing-payment-option-explainer"
              >
                <span className="radio-ui" />
                <span className="radio-ui__label">{getExistingPaymentMethodLabel(existingPaymentMethod)}</span>
                {getPaymentMethodLogo(mapExistingPaymentMethodToPaymentMethod(existingPaymentMethod))}
              </label>
              <div className="existing-payment-option-explainer">
                  Used for your{' '}
                {subscriptionsToExplainerList(existingPaymentMethod.subscriptions.map(subscriptionToExplainerPart))}
              </div>
            </li>
            ))}
          {paymentMethods.map(paymentMethod => (
            <li className="form__radio-group-item">
              <input
                id={`paymentMethodSelector-${paymentMethod}`}
                className="form__radio-group-input"
                name="paymentMethodSelector"
                type="radio"
                value={paymentMethod}
                onChange={() => {
                  props.updatePaymentMethod(paymentMethod);
                  props.updateSelectedExistingPaymentMethod(undefined);
                }}
                checked={props.paymentMethod === paymentMethod}
              />
              <label htmlFor={`paymentMethodSelector-${paymentMethod}`} className="form__radio-group-label">
                <span className="radio-ui" />
                <span className="radio-ui__label">{getPaymentLabel(paymentMethod)}</span>
                {getPaymentMethodLogo(paymentMethod)}
              </label>
            </li>
          ))}
          {
            contributionTypeIsRecurring(props.contributionType) &&
            props.existingPaymentMethods &&
            props.existingPaymentMethods.length > 0 &&
            fullExistingPaymentMethods.length === 0 && (
              <li className="form__radio-group-item">
                ...or <a className="reauthenticate-link" href={getReauthenticateUrl()}>re-enter your password</a> to use one of your existing payment methods.
              </li>
            )
          }
        </ul>
        : noPaymentMethodsErrorMessage
      }

    </fieldset>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethodSelector);