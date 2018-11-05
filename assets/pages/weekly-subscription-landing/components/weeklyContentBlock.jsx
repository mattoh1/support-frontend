// @flow

// ----- Imports ----- //

import React, { type Node } from 'react';
import LeftMarginSection from 'components/leftMarginSection/leftMarginSection';
import { classNameWithModifiers } from 'helpers/utilities';
import { string } from 'postcss-selector-parser';


// ---- Types ----- //

type PropTypes = {|
  type: 'white' | 'grey' | 'feature' | 'dark',
  id?: ?string,
  children: Node
|};


// ----- Render ----- //

const WeeklyContentBlock = ({ type, children, id }: PropTypes) => (
  <div id={id} className={classNameWithModifiers('component-weekly-content-block', [type])}>
    <LeftMarginSection>
      <div className="component-weekly-content-block__content">
        {children}
      </div>
    </LeftMarginSection>
  </div>
);

WeeklyContentBlock.defaultProps = {
  type: 'white',
  id: null,
};

export default WeeklyContentBlock;
