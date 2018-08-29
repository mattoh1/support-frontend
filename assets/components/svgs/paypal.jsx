// @flow

import React from 'react';

// The generic credit card logo used on checkouts.
export default function SvgPayPal() {

  return (
    <svg class="svg-paypal" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 18" preserveAspectRatio="xMinYMid">
      <image width="15" height="18" href="data:image/png;base64,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" fill="none" fill-rule="evenodd"/>
    </svg>
  );
}