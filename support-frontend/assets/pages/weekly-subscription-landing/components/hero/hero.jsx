// @flow

// ----- Imports ----- //

import React from 'react';
import GridPicture from 'components/gridPicture/gridPicture';
import AnchorButton from 'components/button/anchorButton';
import SvgChevron from 'components/svgs/chevron';
import GridImage from 'components/gridImage/gridImage';
import { sendTrackingEventsOnClick } from 'helpers/subscriptions';
import ProductPagehero
  from 'components/productPage/productPageHero/productPageHero';

import './weeklyCampaign.scss';

const HeroImage = () => (
  <GridPicture
    sources={[
        {
          gridId: 'weeklyLandingHero',
          srcSizes: [500, 1000],
          imgType: 'png',
          sizes: '100vw',
          media: '(max-width: 739px)',
        },
        {
          gridId: 'weeklyLandingHero',
          srcSizes: [1000, 2000],
          imgType: 'png',
          sizes: '(min-width: 1000px) 2000px, 1000px',
          media: '(min-width: 740px)',
        },
      ]}
    fallback="weeklyLandingHero"
    fallbackSize={1000}
    altText="A collection of Guardian Weekly magazines"
    fallbackImgType="png"
  />
);

const CampaignHeader = (props: {heading: string, orderIsAGift: boolean}) => (

  <ProductPagehero
    appearance="campaign"
    overheading="Guardian Weekly subscriptions"
    heading={props.heading}
    modifierClasses={['weekly-campaign']}
    content={<AnchorButton onClick={sendTrackingEventsOnClick('options_cta_click', 'GuardianWeekly', null)} icon={<SvgChevron />} href="#subscribe">See Subscription options</AnchorButton>}
    hasCampaign
  >

    <div className="weekly-campaign-hero">
      <div className="weekly-campaign-hero__copy">
        {props.orderIsAGift ? (
          <h2>Give<br />The Guardian<br />Weekly<br />as a gift</h2>
          ) : (
            <h2>The Guardian<br />Weekly</h2>
          )
        }
      </div>

      <div className="weekly-campaign-hero__graphic">
        <GridImage
          gridId="weeklyCampaignHeroImg"
          srcSizes={[1000, 1358]}
          sizes="(max-width: 740px) 1000px, 1358px"
          imgType="png"
          altText="A collection of Guardian Weekly magazines"
        />
      </div>

    </div>


  </ProductPagehero>
);


export { CampaignHeader, HeroImage };
