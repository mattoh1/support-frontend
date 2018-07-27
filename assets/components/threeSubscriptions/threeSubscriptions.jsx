// @flow

// ----- Imports ----- //

import React from 'react';

import { getSubsLinks } from 'helpers/externalLinks';
import { getCampaign } from 'helpers/tracking/acquisitions';
import { getPaperBenefits, getDigitalBenefits, getPaperDigitalBenefits, getPrice } from 'helpers/flashSale';

import PageSection from 'components/pageSection/pageSection';
import SubscriptionBundle from 'components/subscriptionBundle/subscriptionBundle';

import type { ReferrerAcquisitionData } from 'helpers/tracking/acquisitions';
import type { HeadingSize } from 'components/heading/heading';


// ----- Types ----- //

type PropTypes = {
  referrerAcquisitionData: ReferrerAcquisitionData,
  digitalHeadingSize: HeadingSize,
  paperHeadingSize: HeadingSize,
  paperDigitalHeadingSize: HeadingSize,
};


// ----- Setup ----- //

const gridImageProperties = {
  srcSizes: [825, 500, 140],
  sizes: '(max-width: 660px) 165px, (max-width: 740px) 174px, (max-width: 980px) 196px, (max-width: 1140px) 205px, 165px',
  imgType: 'png',
};


// ----- Component ----- //

export default function ThreeSubscriptions(props: PropTypes) {

  const subsLinks = getSubsLinks(
    props.referrerAcquisitionData.campaignCode,
    getCampaign(props.referrerAcquisitionData),
    [],
    props.referrerAcquisitionData,
  );

  return (
    <div className="component-three-subscriptions">
      <PageSection heading="Subscribe" modifierClass="three-subscriptions">
        <DigitalBundle url={subsLinks.digital} headingSize={props.digitalHeadingSize} />
        <PaperBundle url={subsLinks.paper} headingSize={props.paperHeadingSize} />
        <PaperDigitalBundle url={subsLinks.paperDig} headingSize={props.paperDigitalHeadingSize} />
      </PageSection>
    </div>
  );

}


// ----- Auxiliary Components ----- //

function DigitalBundle(props: { url: string, headingSize: HeadingSize }) {

  return (
    <SubscriptionBundle
      modifierClass="digital"
      heading="Digital"
      subheading={`£${getPrice('digital', '11.99')}/month`}
      benefits={getDigitalBenefits()}
      ctaText="Start your 14 day trial"
      ctaUrl={props.url}
      ctaAccessibilityHint="The Guardian\'s digital subscription is available for eleven pounds and ninety nine pence per month. Find out how to sign up for a free trial."
      gridImage={{
        gridId: 'digitalCircle',
        altText: 'digital subscription',
        ...gridImageProperties,
      }}
      ctaModifiers={['digital', 'border']}
      headingSize={props.headingSize}
    />
  );

}

function PaperBundle(props: { url: string, headingSize: HeadingSize }) {

  return (
    <SubscriptionBundle
      modifierClass="paper"
      heading="Paper"
      subheading={`from £${getPrice('paper', '10.36')}/month`}
      benefits={getPaperBenefits()}
      ctaText="Get a paper subscription"
      ctaUrl={props.url}
      ctaAccessibilityHint="Proceed to paper subscription options, starting at ten pounds seventy nine pence per month."
      gridImage={{
        gridId: 'paperCircle',
        altText: 'paper subscription',
        ...gridImageProperties,
      }}
      ctaModifiers={['paper', 'border']}
      headingSize={props.headingSize}
    />
  );

}

function PaperDigitalBundle(props: { url: string, headingSize: HeadingSize }) {

  return (
    <SubscriptionBundle
      modifierClass="paper-digital"
      heading="Paper+digital"
      subheading={`from £${getPrice('paperAndDigital', '21.62')}/month`}
      benefits={getPaperDigitalBenefits()}
      ctaText="Get a paper+digital subscription"
      ctaUrl={props.url}
      ctaAccessibilityHint="Proceed to choose which days you would like to regularly receive the newspaper in conjunction with a digital subscription"
      gridImage={{
        gridId: 'paperDigitalCircle',
        altText: 'paper + digital subscription',
        ...gridImageProperties,
      }}
      ctaModifiers={['paper-digital', 'border']}
      headingSize={props.headingSize}
    />
  );

}
