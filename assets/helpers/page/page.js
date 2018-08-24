// @flow

// ----- Imports ----- //

import 'ophan';
import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
  type Reducer,
  type StoreEnhancer,
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import type { Store } from 'redux';

import * as abTest from 'helpers/abTests/abtest';
import type { Participations } from 'helpers/abTests/abtest';
import type { Switches } from 'helpers/switch';
import * as logger from 'helpers/logger';
import * as googleTagManager from 'helpers/tracking/googleTagManager';
import { detect as detectCountry, type IsoCountry } from 'helpers/internationalisation/country';
import { detect as detectCurrency, type IsoCurrency } from 'helpers/internationalisation/currency';
import { getAllQueryParamsWithExclusions } from 'helpers/url';
import {
  getCampaign,
  getAcquisition,
  type Campaign,
  type ReferrerAcquisitionData,
} from 'helpers/tracking/acquisitions';
import {
  detect as detectCountryGroup,
  type CountryGroupId,
} from 'helpers/internationalisation/countryGroup';

import type { Action } from './pageActions';


// ----- Types ----- //

export type Internationalisation = {|
  currencyId: IsoCurrency,
  countryGroupId: CountryGroupId,
  countryId: IsoCountry,
|};

export type CommonState = {
  campaign: ?Campaign,
  referrerAcquisitionData: ReferrerAcquisitionData,
  otherQueryParams: Array<[string, string]>,
  abParticipations: Participations,
  switches: Switches,
  internationalisation: Internationalisation,
};


// ----- Functions ----- //

function doNotTrack(): boolean {
  // $FlowIgnore
  const doNotTrackFlag = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;

  return doNotTrackFlag === '1' || doNotTrackFlag === 'yes';
}

// Sets up GA and logging.
function analyticsInitialisation(participations: Participations): void {
  if (!(doNotTrack())) {
    googleTagManager.init(participations);
  }
  // Logging.
  logger.init();
}

// Creates the initial state for the common reducer.
function buildInitialState(
  abParticipations: Participations,
  countryGroupId: CountryGroupId,
  countryId: IsoCountry,
  currencyId: IsoCurrency,
  switches: Switches,
): CommonState {
  const acquisition = getAcquisition(abParticipations);
  const excludedParameters = ['REFPVID', 'INTCMP', 'acquisitionData'];
  const otherQueryParams = getAllQueryParamsWithExclusions(excludedParameters);
  const internationalisation = {
    countryGroupId,
    countryId,
    currencyId,
  };

  // That's just temporary, until I figure out how the current workflow works
  // and add reducers/actions.
  const newPaymentUI = {
    labels: {
      ANNUAL: 'Annually',
      MONTHLY: 'Monthly',
      ONE_OFF: 'Single'
    },
    contributionType: 'MONTHLY',
    amount: '5',
    otherAmount: null
  };


  return {
    campaign: acquisition ? getCampaign(acquisition) : null,
    referrerAcquisitionData: acquisition,
    otherQueryParams,
    internationalisation,
    abParticipations,
    switches,
    newPaymentUI,
  };

}

// Sets up the common reducer with its initial state.
function createCommonReducer(initialState: CommonState): (state?: CommonState, action: Action) => CommonState {

  return function commonReducer(
    state?: CommonState = initialState,
    action: Action,
  ): CommonState {

    switch (action.type) {

      case 'SET_COUNTRY':
        return {
          ...state,
          internationalisation: { ...state.internationalisation, countryId: action.country },
        };

      default:
        return state;
    }

  };

}

// For pages that don't need Redux.
function statelessInit() {
  const country: IsoCountry = detectCountry();
  const countryGroupId: CountryGroupId = detectCountryGroup();
  const participations: Participations = abTest.init(country, countryGroupId);
  analyticsInitialisation(participations);
}

// Enables redux devtools extension and optional redux-thunk.
/* eslint-disable no-underscore-dangle */
function storeEnhancer<S, A>(thunk: boolean): StoreEnhancer<S, A> | typeof undefined {

  if (thunk) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return composeEnhancers(applyMiddleware(thunkMiddleware));
  }

  return window.__REDUX_DEVTOOLS_EXTENSION__ ?
    window.__REDUX_DEVTOOLS_EXTENSION__()
    : undefined;

}
/* eslint-enable no-underscore-dangle */

// Initialises the page.
function init<S, A>(
  pageReducer: Reducer<S, A> | null = null,
  thunk?: boolean = false,
): Store<*, *, *> {

  const countryGroupId: CountryGroupId = detectCountryGroup();
  const countryId: IsoCountry = detectCountry();
  const currencyId: IsoCurrency = detectCurrency(countryGroupId);
  const participations: Participations = abTest.init(countryId, countryGroupId);
  const { switches } = window.guardian;
  analyticsInitialisation(participations);

  const initialState: CommonState = buildInitialState(
    participations,
    countryGroupId,
    countryId,
    currencyId,
    switches,
  );
  const commonReducer = createCommonReducer(initialState);

  return createStore(
    combineReducers({ page: pageReducer, common: commonReducer }),
    storeEnhancer(thunk),
  );
}


// ----- Exports ----- //

export {
  createCommonReducer,
  init,
  statelessInit,
};
