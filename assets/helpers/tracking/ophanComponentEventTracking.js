// @flow
// ----- Imports ----- //

import * as ophan from 'ophan';
import type { OphanComponent, OphanAction } from 'helpers/tracking/ophanComponentEventTypes';

// ----- Functions ----- //

export const trackComponentEvents = (
  action: OphanAction,
  component: OphanComponent,
  id?: string,
) => {
  ophan.record({
    componentEvent: {
      component,
      action,
      id,
    },
  });
};
