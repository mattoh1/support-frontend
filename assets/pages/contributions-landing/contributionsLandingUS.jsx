// @flow

// ----- Imports ----- //

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';

import SimpleHeader from 'components/headers/simpleHeader/simpleHeader';
import SimpleFooter from 'components/footers/simpleFooter/simpleFooter';
import ContribLegal from 'components/legal/contribLegal/contribLegal';

import pageStartup from 'helpers/pageStartup';
import { getQueryParameter } from 'helpers/url';
import { parseBoolean } from 'helpers/utilities';

import reducer from './reducers/reducers';
import ContributionsIntroduction from './components/contributionsIntroduction';
import ContributionsContext from './components/contributionsContext';
import ContributionsContextIntro from './components/contributionsContextIntro';
import ContributionsBundle from './components/contributionsBundle';


// ----- Page Startup ----- //

const participation = pageStartup.start();


// ----- Redux Store ----- //

const store = createStore(reducer, {
  intCmp: getQueryParameter('INTCMP'),
  isoCountry: 'US',
}, applyMiddleware(thunkMiddleware));

store.dispatch({ type: 'SET_AB_TEST_PARTICIPATION', payload: participation });
store.dispatch({
  type: 'SET_CONTEXT',
  context: parseBoolean(getQueryParameter('context', 'false')),
});


// ----- Render ----- //

const content = (
  <Provider store={store}>
    <div className="gu-content">
      <SimpleHeader />
      <section className="contributions-bundle">
        <div className="contributions-bundle__content gu-content-margin">
          {store.getState().contribution.context
            ? <ContributionsContext />
            : <ContributionsIntroduction />
          }
          {store.getState().contribution.context ? <ContributionsContextIntro /> : null}
          <ContributionsBundle />
        </div>
      </section>
      <section className="contributions-legal gu-content-filler">
        <div className="contributions-legal__content gu-content-filler__inner">
          <ContribLegal />
        </div>
      </section>
      <SimpleFooter />
    </div>
  </Provider>
);

ReactDOM.render(content, document.getElementById('contributions-landing-page-us'));
