// @flow

// ----- Imports ----- //

import { combineReducers } from 'redux';

import { contributionSelectionReducerFor } from 'containerisableComponents/contributionSelection/contributionSelectionReducer';
import { payPalContributionButtonReducerFor } from 'containerisableComponents/payPalContributionButton/payPalContributionButtonReducer';

import type { State as ContributionSelectionState } from 'containerisableComponents/contributionSelection/contributionSelectionReducer';
import type { State as PayPalState } from 'containerisableComponents/payPalContributionButton/payPalContributionButtonReducer';

import type { CommonState } from 'helpers/page/page';


// ----- Types ----- //

type PageState = {
  selection: ContributionSelectionState,
  payPal: PayPalState,
};

export type State = {
  common: CommonState,
  page: PageState,
};


// ----- Functions ----- //

function reducer(initialStateOverrides: Object) {

  return combineReducers({
    selection: contributionSelectionReducerFor('CONTRIBUTE_SECTION', initialStateOverrides),
    payPal: payPalContributionButtonReducerFor('CONTRIBUTE_SECTION'),
  });

}


// ----- Reducer ----- //

export { reducer };
