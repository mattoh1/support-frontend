// @flow

// ----- Imports ----- //

import type { Action } from './stripeCheckoutActions';


// ----- Types ----- //

export type State = {
  loaded: boolean,
  amount: ?number,
  token: ?string,
  currency: string,
};


// ----- Setup ----- //

const initialState: State = {
  loaded: false,
  amount: null,
  token: null,
  currency: 'GBP',
};


// ----- Exports ----- //

export default function stripeCheckoutReducer(
  state: State = initialState,
  action: Action): State {

  switch (action.type) {

    case 'STRIPE_CHECKOUT_LOADED':
      return Object.assign({}, state, { loaded: true });

    case 'SET_STRIPE_AMOUNT':
      return Object.assign({}, state, { amount: action.amount });

    default:
      return state;

  }

}
