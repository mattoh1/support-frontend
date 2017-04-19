// ----- Imports ----- //

import React from 'react';
import { connect } from 'react-redux';

import FeatureList from 'components/featureList/featureList';
import RadioToggle from 'components/radioToggle/radioToggle';
import Bundle from './Bundle';
import ContribAmounts from './ContribAmounts';
import {
  changePaperBundle,
  changeContribType,
} from '../actions/bundlesLandingActions';


// ----- Copy ----- //

const bundles = {
  allContrib: {
    heading: 'From £5/month',
    subheading: 'Make a contribution',
    infoText: 'Support the Guardian. Every penny of your contribution goes to support our fearless, quality journalism.',
    ctaText: 'Contribute with credit/debit card',
    modifierClass: 'contributions',
  },
  contribRecurring: {
    ctaLink: '/monthly-contribution',
  },
  contribOneOff: {
    ctaLink: 'https://contribute.theguardian.com/uk',
  },
  digital: {
    heading: '£11.99/month',
    subheading: 'Become a digital subscriber',
    listItems: [
      {
        heading: 'Ad-free mobile app',
        text: 'Faster pages and a clearer reading experience',
      },
      {
        heading: 'Daily tablet edition',
        text: 'Daily newspaper optimised for tablet; available on Apple, Android and Kindle Fire',
      },
      {
        heading: 'Free trial',
        text: 'For 14 days, enjoy on up to 10 devices',
      },
    ],
    infoText: 'Support the Guardian and enjoy a subscription to our digital Daily Edition and the premium tier of our app.',
    ctaText: 'Become a digital subscriber',
    ctaLink: 'https://subscribe.theguardian.com/p/DXX83X?INTCMP=gdnwb_copts_bundles_landing_default',
    modifierClass: 'digital',
  },
  allPaper: {
    subheading: 'Become a paper subscriber',
    infoText: 'Support the Guardian and enjoy a subscription to the Guardian and the Observer newspapers.',
    ctaText: 'Become a paper subscriber',
    modifierClass: 'paper',
  },
  paperDigital: {
    heading: 'From £22.06/month',
    listItems: [
      {
        heading: 'Newspaper',
        text: 'Choose the package you want: Everyday+, Sixday+, Weekend+ and Sunday+',
      },
      {
        heading: 'Digital',
        text: 'All the benefits of the digital subscription',
      },
      {
        heading: 'Save money',
        text: 'Up to 36% off the retail price',
      },
    ],
    ctaLink: 'https://subscribe.theguardian.com/p/GXX83X?INTCMP=gdnwb_copts_bundles_landing_default',
  },
  paperOnly: {
    heading: 'From £10.79/month',
    listItems: [
      {
        heading: 'Newspaper',
        text: 'Choose the package you want: Everyday+, Sixday+, Weekend+ and Sunday+',
      },
      {
        heading: 'Save money',
        text: 'Up to 36% off the retail price',
      },
    ],
    ctaLink: 'https://subscribe.theguardian.com/p/GXX83P?INTCMP=gdnwb_copts_bundles_landing_default',
  },
};

const toggles = {
  paper: {
    name: 'paper-toggle',
    radios: [
      {
        value: 'PAPER+DIGITAL',
        text: 'Paper + digital',
      },
      {
        value: 'PAPER',
        text: 'Paper',
      },
    ],
  },
  contribType: {
    name: 'contributions-period-toggle',
    radios: [
      {
        value: 'RECURRING',
        text: 'Monthly',
      },
      {
        value: 'ONE_OFF',
        text: 'One-off',
      },
    ],
  },
};


// ----- Functions ----- //

function getContribAttrs(contribType) {

  if (contribType === 'RECURRING') {
    return Object.assign({}, bundles.allContrib, bundles.contribRecurring);
  }

  return Object.assign({}, bundles.allContrib, bundles.contribOneOff);

}

function getPaperAttrs(bundle) {

  if (bundle === 'PAPER+DIGITAL') {
    return Object.assign({}, bundles.allPaper, bundles.paperDigital);
  }

  return Object.assign({}, bundles.allPaper, bundles.paperOnly);

}


// ----- Component ----- //

function Bundles(props) {

  const paperAttrs = getPaperAttrs(props.paperBundle);
  const contribAttrs = getContribAttrs(props.contribType);

  return (
    <div className="bundles">
      <Bundle {...contribAttrs}>
        <RadioToggle
          {...toggles.contribType}
          toggleAction={props.toggleContribType}
          checked={props.contribType}
        />
        <ContribAmounts />
      </Bundle>
      <Bundle {...bundles.digital}>
        <FeatureList listItems={bundles.digital.listItems} />
      </Bundle>
      <Bundle {...paperAttrs}>
        <RadioToggle
          {...toggles.paper}
          toggleAction={props.togglePaperBundle}
          checked={props.paperBundle}
        />
        <FeatureList listItems={paperAttrs.listItems} />
      </Bundle>
    </div>
  );

}


// ----- Proptypes ----- //

Bundles.propTypes = {
  paperBundle: React.PropTypes.string.isRequired,
  contribType: React.PropTypes.string.isRequired,
  togglePaperBundle: React.PropTypes.func.isRequired,
  toggleContribType: React.PropTypes.func.isRequired,
};


// ----- Map State/Props ----- //

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {

  return {
    togglePaperBundle: (bundle) => {
      dispatch(changePaperBundle(bundle));
    },
    toggleContribType: (period) => {
      dispatch(changeContribType(period));
    },
  };

}


// ----- Exports ----- //

export default connect(mapStateToProps, mapDispatchToProps)(Bundles);
