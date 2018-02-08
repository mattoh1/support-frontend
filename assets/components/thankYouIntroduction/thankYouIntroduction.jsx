// @flow

// ----- Imports ----- //

import React from 'react';

import Highlights from 'components/highlights/highlights';


// ----- Types ----- //

type PropTypes = {
  highlights?: ?string[],
  headings: string[],
};


// ----- Component ----- //

function ThankYouIntroduction(props: PropTypes) {
  return (
    <section className="component-thank-you-introduction">
      <div className="component-thank-you-introduction__content gu-content-margin">
        <div className="component-thank-you-introduction__copy">
          <Highlights highlights={props.highlights} />
          <h1 className="component-thank-you-introduction__heading">
            {props.headings.map(heading =>
              <span className="component-thank-you-introduction__heading-line">{heading}</span>)}
          </h1>
        </div>
      </div>
    </section>
  );
}


// ----- Default Props ----- //

ThankYouIntroduction.defaultProps = {
  highlights: null,
};


// ----- Exports ----- //

export default ThankYouIntroduction;
