// @flow

// ----- Imports ----- //

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import SimpleHeader from 'components/headers/simpleHeader/simpleHeader';
import LinksFooter from 'components/footers/linksFooter/linksFooter';

import { trackOphan } from 'helpers/abtest';
import { init as pageInit } from 'helpers/page/page';

import Introduction from './components/Introduction';
import Bundles from './components/Bundles';
import WhySupport from './components/WhySupport';
import WaysOfSupport from './components/WaysOfSupport';
import reducer from './bundlesLandingReducers';


// ----- Redux Store ----- //

const store = pageInit(reducer);


// ----- Setup ----- //

const participations = store.getState().common.abParticipations;
if (participations.addAnnualContributions) {
  trackOphan('addAnnualContributions', participations.addAnnualContributions);
}


// ----- Render ----- //

const content = (
  <Provider store={store}>
    <div>
      <SimpleHeader />
      <Introduction />
      <Bundles />
      <WhySupport />
      {store.getState().common.campaign === 'baseline_test' ? '' : <WaysOfSupport />}
      <LinksFooter />
    </div>
  </Provider>
);

ReactDOM.render(content, document.getElementById('bundles-landing-page'));
