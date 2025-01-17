// @flow

// ----- Imports ----- //

import React from 'react';

import { countryGroups, type CountryGroup } from 'helpers/internationalisation/countryGroup';
import { currencies } from 'helpers/internationalisation/currency';
import SvgCheckmark from 'components/svgs/checkmark';
import SvgChevron from 'components/svgs/chevron';
import SvgGlobe from 'components/svgs/globe';
import SvgGuardianRoundel from 'components/svgs/guardianRoundel';
import './slimRoundelHeader.scss';

// ----- Types ----- //

type PropTypes = {|
  selectedCountryGroup: ?CountryGroup,
|};

// ----- Render ----- //

const renderCountryGroup = (selectedCountryGroup: CountryGroup) => (countryGroup: CountryGroup) => (
  <li className="countryGroups__item">
    <a href={`/${countryGroup.supportInternationalisationId}/contribute`}>
      {countryGroup.name} ({currencies[countryGroup.currency].extendedGlyph})
      {countryGroup === selectedCountryGroup ? (
        <span className="icon">
          <SvgCheckmark />
        </span>
      ) : null}
    </a>
  </li>
);

function SlimRoundelHeader(props: PropTypes) {
  return (
    <header role="banner" className="slim-roundel-header">
      <a className="glogo" href="https://www.theguardian.com">
        <SvgGuardianRoundel className="slim-header-roundel" />
        <h2 className="glogo-alt-text">Return to The Guardian</h2>
      </a>
      { props.selectedCountryGroup ? (
        <details className="countryGroups">
          <summary aria-label={`Selected country: ${props.selectedCountryGroup.name} (${currencies[props.selectedCountryGroup.currency].glyph})`}>
            {/* Safari doesn't respect styles applied to <summary> so we need this wrapper div */}
            <div className="countryGroups__summary-wrapper">
              <SvgGlobe />
              <span className="countryGroups__label">{props.selectedCountryGroup.name} ({currencies[props.selectedCountryGroup.currency].extendedGlyph})</span>
              <span className="icon icon--arrows">
                <SvgChevron />
              </span>
            </div>
          </summary>
          <ul className="countryGroups__list">
            {
              Object.keys(countryGroups)
                .map(countryGroup => countryGroups[countryGroup])
                .map(renderCountryGroup((props.selectedCountryGroup: any)))
            }
          </ul>
        </details>
      ) : null}
    </header>
  );
}

SlimRoundelHeader.defaultProps = {
  selectedCountryGroup: null,
};

export { SlimRoundelHeader };
