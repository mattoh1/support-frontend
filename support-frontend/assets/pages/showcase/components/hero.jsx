// @flow

import React from 'react';

import { HeroWrapper } from 'components/productPage/productPageHero/productPageHero';
import GridImage from 'components/gridImage/gridImage';

import HeroImg from './hero.svg';

import './hero.scss';

export default function BreakingHeadlines() {
  return (
    <div className="showcase-hero">
      <HeroWrapper appearance="custom">
        <div className="showcase-hero-heading">
          <h1 className="accessibility-hint">Support the guardian</h1>
          <h2 className="accessibility-hint">Help us support investigative independent journalism</h2>
          <HeroImg />
        </div>
        <figure className="showcase-hero__figure">
          <div className="showcase-hero__image">
            <GridImage
              gridId="showcaseChris"
              srcSizes={[1000, 500]}
              sizes="(max-width: 740px) 100vw, 400px"
              imgType="jpg"
            />
          </div>
          <div className="showcase-hero__image">
            <GridImage
              gridId="showcaseZuckEyes"
              srcSizes={[1000, 500]}
              sizes="(max-width: 740px) 100vw, 400px"
              imgType="jpg"
            />
          </div>
          <div className="showcase-hero__image">
            <GridImage
              gridId="showcaseZuck"
              srcSizes={[1000, 500]}
              sizes="(max-width: 740px) 100vw, 400px"
              imgType="jpg"
            />
          </div>
          <div className="showcase-hero__image">
            <GridImage
              gridId="showcaseBrit"
              srcSizes={[1000, 500]}
              sizes="(max-width: 740px) 100vw, 600px"
              imgType="jpg"
            />
          </div>
          <figcaption className="showcase-hero__caption">
            <strong>Cambridge Analytica</strong>
            <p>A year-long investigation in which we revealed how the data
              analytics firm Cambridge Analytica that was behind Trump’s 2016
              campaign and played a role in Brexit, had used the data harvested
              from 87 million Facebook users without their consent.
              This reporting led to a public apology from Facebook’s
              Mark Zuckerberg who was forced to testify before Congress.
            </p>
          </figcaption>
        </figure>
      </HeroWrapper>
    </div>
  );
}