// @flow

// ----- Imports ----- //

import React from 'react';

import Content from 'components/content/content';
import Text, { LargeParagraph } from 'components/text/text';
import HeadingBlock from 'components/headingBlock/headingBlock';
import ThankYouHero from './components/thankYou/hero';
import { HeroWrapper } from 'components/productPage/productPageHero/productPageHero';
import { sendClickedEvent } from 'helpers/tracking/clickTracking';
import { type CountryGroupId } from 'helpers/internationalisation/countryGroup';


// ----- Component ----- //

function ThankYouPendingContent(props: {countryGroupId: CountryGroupId}) {

  return (
    <div className="thank-you-stage">
      <ThankYouHero
        countryGroupId={props.countryGroupId}
      />
      <HeroWrapper appearance="custom">
        <HeadingBlock>
          Your Digital Pack subscription is being processed
        </HeadingBlock>
      </HeroWrapper>
      <Content>
        <Text>
          <LargeParagraph>
            Thank you for subscribing to the Digital Pack.
            Your subscription is being processed and you will
            receive an email when your account is live.
          </LargeParagraph>
          <p>
            If you require any further assistance, you can visit
            our {(
              <a
                onClick={sendClickedEvent('dp checkout : faq')}
                href="https://www.theguardian.com/subscriber-direct/subscription-frequently-asked-questions"
              >
              FAQs page
              </a>
            )} to find answers to common user issues. Alternatively, you can also
            visit our {(
              <a
                onClick={sendClickedEvent('dp checkout : help')}
                href="https://www.theguardian.com/help"
              >Help page
              </a>
            )} for customer support.
          </p>
        </Text>
      </Content>
    </div>
  );

}

// ----- Export ----- //

export default ThankYouPendingContent;