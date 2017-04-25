// @flow

// ----- Imports ----- //

import type { Contrib, Amount, PaperBundle } from '../reducers/reducers';


// ----- Types ----- //

export type Action =
  | { type: 'CHANGE_PAPER_BUNDLE', bundle: PaperBundle }
  | { type: 'CHANGE_CONTRIB_TYPE', contribType: Contrib }
  | { type: 'CHANGE_CONTRIB_AMOUNT', amount: Amount }
  | { type: 'CHANGE_CONTRIB_AMOUNT_RECURRING', amount: Amount }
  | { type: 'CHANGE_CONTRIB_AMOUNT_ONEOFF', amount: Amount }
  ;


// ----- Actions ----- //

export function changePaperBundle(bundle: PaperBundle): Action {
  return { type: 'CHANGE_PAPER_BUNDLE', bundle };
}

export function changeContribType(contribType: Contrib): Action {
  return { type: 'CHANGE_CONTRIB_TYPE', contribType };
}

export function changeContribAmount(amount: Amount): Action {
  return { type: 'CHANGE_CONTRIB_AMOUNT', amount };
}

export function changeContribAmountRecurring(amount: Amount): Action {
  return { type: 'CHANGE_CONTRIB_AMOUNT_RECURRING', amount };
}

export function changeContribAmountOneOff(amount: Amount): Action {
  return { type: 'CHANGE_CONTRIB_AMOUNT_ONEOFF', amount };
}
