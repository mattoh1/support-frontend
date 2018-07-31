// @flow

// ----- Imports ----- //

import React from 'react';

import {
  getSubsLinks,
  iOSAppUrl,
  androidAppUrl,
  dailyEditionUrl,
} from 'helpers/externalLinks';
import { getCampaign } from 'helpers/tracking/acquisitions';
import { getPrice } from 'helpers/flashSale';
import type { ReferrerAcquisitionData } from 'helpers/tracking/acquisitions';
import { addQueryParamsToURL } from 'helpers/url';

import PageSection from 'components/pageSection/pageSection';
import SubscriptionBundle from 'components/subscriptionBundle/subscriptionBundle';
import { type HeadingSize } from 'components/heading/heading';


// ----- Types ----- //

type PropTypes = {
  referrerAcquisitionData: ReferrerAcquisitionData,
  headingSize: HeadingSize,
};


// ----- Setup ----- //

const gridImageProperties = {
  srcSizes: [825, 500, 140],
  sizes: '(max-width: 660px) 165px, (max-width: 740px) 174px, (max-width: 980px) 196px, (max-width: 1140px) 205px, 165px',
  imgType: 'png',
};

const appReferrer = 'utm_source=support.theguardian.com&utm_medium=subscribe_landing_page&utm_campaign=split_subscriptions_test';


// ----- Component ----- //

export default function DigitalSubscriptions(props: PropTypes) {

  const subsLinks = getSubsLinks(
    props.referrerAcquisitionData.campaignCode,
    getCampaign(props.referrerAcquisitionData),
    [],
    props.referrerAcquisitionData,
  );

  return (
    <div className="component-digital-subscriptions">
      <PageSection
        heading="Digital Subscriptions"
        modifierClass="digital-subscriptions"
      >
        <PremiumTier
          iosUrl={addQueryParamsToURL(iOSAppUrl, { referrer: appReferrer })}
          androidUrl={addQueryParamsToURL(androidAppUrl, { referrer: appReferrer })}
          headingSize={props.headingSize}
        />
        <DailyEdition
          url={addQueryParamsToURL(dailyEditionUrl, { referrer: appReferrer })}
          headingSize={props.headingSize}
        />
        <DigitalBundle
          url={subsLinks.digital}
          headingSize={props.headingSize}
        />
      </PageSection>
    </div>
  );

}


// ----- Auxiliary Components ----- //

function PremiumTier(props: {
    iosUrl: string,
    androidUrl: string,
    headingSize: HeadingSize,
}) {

  return (
    <SubscriptionBundle
      modifierClass="premium-tier"
      heading="Premium App"
      subheading="£5.99/month"
      headingSize={props.headingSize}
      benefits={[
        {
          text: 'The ad free, premium app, designed especially for your smartphone',
        },
      ]}
      gridImage={{
        gridId: 'premiumTierCircle',
        altText: 'premium app',
        ...gridImageProperties,
      }}
      ctas={[
        {
          text: 'Buy in the App Store',
          url: props.iosUrl,
          accessibilityHint: 'Proceed to buy the premium app in the app store',
          modifierClasses: ['premium-tier', 'border', 'ios'],
        },
        {
          text: 'Buy on Google Play',
          url: props.androidUrl,
          accessibilityHint: 'Proceed to buy the premium app in the play store',
          modifierClasses: ['premium-tier', 'border', 'android'],
        },
      ]}
    />
  );

}

function DailyEdition(props: { url: string, headingSize: HeadingSize }) {

  return (
    <SubscriptionBundle
      modifierClass="daily-edition"
      heading="Daily Edition"
      subheading="from £6.99/month"
      headingSize={props.headingSize}
      benefits={[
        {
          text: 'The iPad Edition of The Guardian and The Observer',
        },
      ]}
      gridImage={{
        gridId: 'dailyEditionCircle',
        altText: 'daily edition',
        ...gridImageProperties,
      }}
      ctas={[
        {
          text: 'Buy in the App Store',
          url: props.url,
          accessibilityHint: 'Proceed to buy the daily edition app in the app store',
          modifierClasses: ['daily-edition', 'border'],
        },
      ]}
    />
  );

}

function DigitalBundle(props: { url: string, headingSize: HeadingSize }) {

  return (
    <SubscriptionBundle
      modifierClass="digital"
      heading="Digital Pack"
      subheading={`£${getPrice('digital', '11.99')}/month`}
      headingSize={props.headingSize}
      benefits={[
        {
          text: 'Digital bundle, including the premium app and the iPad daily edition',
        },
      ]}
      gridImage={{
        gridId: 'digitalCircleAlt',
        altText: 'digital subscription',
        ...gridImageProperties,
      }}
      ctas={[
        {
          text: 'Find out more',
          url: props.url,
          accessibilityHint: 'The Guardian\'s digital subscription is available for eleven pounds and ninety nine pence per month. Find out how to sign up for a free trial.',
          modifierClasses: ['digital', 'border'],
        },
      ]}
    />
  );

}
