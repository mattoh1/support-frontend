// @flow

import uuidv4 from 'uuid';
import * as storage from 'helpers/storage';
import { getVariantsAsString } from 'helpers/abTests/abtest';
import { detect as detectCurrency } from 'helpers/internationalisation/currency';
import { getQueryParameter } from 'helpers/url';
import { detect as detectCountryGroup } from 'helpers/internationalisation/countryGroup';
import { getOphanIds } from 'helpers/tracking/acquisitions';
import type { Participations } from 'helpers/abTests/abtest';


// ----- Types ----- //
type EventType = 'DataLayerReady' | 'SuccessfulConversion';

type PaymentRequestAPIStatus = 'PaymentRequestAPINotAvailable' | 'CanMakePaymentNotAvailable' | 'AvailableNotInUse' | 'AvailableInUse' | 'PaymentRequestAPIError';

// ----- Functions ----- //

function getDataValue(name, generator) {
  let value = storage.getSession(name);
  if (value === null) {
    value = generator();
    storage.setSession(name, value);
  }
  return value;
}

function getPaymentAPIStatus(): Promise<PaymentRequestAPIStatus> {
  return new Promise((resolve) => {
    try {

      const { PaymentRequest } = window;

      if (typeof PaymentRequest !== 'function') {
        resolve('PaymentRequestAPINotAvailable');
      }

      const supportedInstruments = [
        {
          supportedMethods: 'basic-card',
          data: {
            supportedNetworks: ['visa', 'mastercard', 'amex', 'jcb',
              'diners', 'discover', 'mir', 'unionpay'],
            supportedTypes: ['credit', 'debit'],
          },
        },
      ];

      const details = {
        total: {
          label: 'tracking',
          amount:
            {
              value: '1',
              currency: getCurrency(),
            },
        },
      };

      const request = new PaymentRequest(supportedInstruments, details);
      if (request && !request.canMakePayment) {
        resolve('CanMakePaymentNotAvailable');
      }

      request
        .canMakePayment()
        .then((result) => {
          if (result) {
            resolve('AvailableInUse');
          } else {
            resolve('AvailableNotInUse');
          }
        });
    } catch (e) {
      resolve('PaymentRequestAPIError');
    }
  });
}

function getCurrency() {
  return detectCurrency(detectCountryGroup()).iso;
}

function getContributionValue() {
  const param = getQueryParameter('contributionValue');
  if (param) {
    storage.setSession('contributionValue', String(parseInt(param, 10)));
  }
  return storage.getSession('contributionValue') || 0;
}

function pushToDataLayer(event: EventType, participations: Participations) {
  window.googleTagManagerDataLayer = window.googleTagManagerDataLayer || [];


  getPaymentAPIStatus()
    .then((paymentRequestApiStatus) => {
      window.googleTagManagerDataLayer.push({
        event,
        // orderId anonymously identifies this user in this session.
        // We need this to prevent page refreshes on conversion pages being
        // treated as new conversions
        orderId: getDataValue('orderId', uuidv4),
        currency: getDataValue('currency', getCurrency),
        value: getContributionValue(),
        paymentMethod: storage.getSession('paymentMethod') || undefined,
        campaignCodeBusinessUnit: getQueryParameter('CMP_BUNIT') || undefined,
        campaignCodeTeam: getQueryParameter('CMP_TU') || undefined,
        experience: getVariantsAsString(participations),
        ophanBrowserID: getOphanIds().browserId,
        paymentRequestApiStatus,
      });
    });
}

function init(participations: Participations) {
  pushToDataLayer('DataLayerReady', participations);
}

function successfulConversion(participations: Participations) {
  pushToDataLayer('SuccessfulConversion', participations);
}

// ----- Exports ---//

export {
  init,
  successfulConversion,
};
