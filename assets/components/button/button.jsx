// @flow

// ----- Imports ----- //

import React from 'react';

import SharedButton, { defaultProps, type SharedButtonPropTypes } from './_sharedButton';
import './button.scss';

// ----- Render ----- //

type PropTypes = {
  ...SharedButtonPropTypes,
  'aria-label': ?string,
};

const Button = (props: PropTypes) => (
  <SharedButton
    element="button"
    {...props}
  />
);

Button.defaultProps = {
  ...defaultProps,
};

export default Button;
