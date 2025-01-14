// @flow

// ----- Imports ----- //

import React from 'react';
import {
  type ProductPrice,
  showPrice,
} from 'helpers/productPrice/productPrices';
import type { BillingPeriod } from 'helpers/billingPeriods';
import { getPriceDescription } from 'helpers/productPrice/priceDescriptions';
import { getAppliedPromo, hasDiscount } from 'helpers/productPrice/promotions';

export type PropTypes = {
  productPrice: ProductPrice,
  billingPeriod: BillingPeriod,
  orderIsAGift?: boolean,
  giftStyles?: Object,
}

function PriceLabel({
  productPrice,
  billingPeriod,
  orderIsAGift,
  giftStyles,
  ...props
}: PropTypes) {
  const description = getPriceDescription(productPrice, billingPeriod, true);

  const promotion = getAppliedPromo(productPrice.promotions);
  return (
    <span {...props}>
      {
        hasDiscount(promotion) && (
          <del aria-hidden="true">{showPrice(productPrice)}</del>
        )
      }
      <span className={orderIsAGift && giftStyles}>{` ${description}`}</span>
    </span>);
}

PriceLabel.defaultProps = {
  giftStyles: {},
  orderIsAGift: false,
};

export { PriceLabel };
