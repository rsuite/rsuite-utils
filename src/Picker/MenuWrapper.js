// @flow

import * as React from 'react';
import classNames from 'classnames';
import _ from 'lodash';

import { namespace } from './constants';

const placementProps = [
  'placement',
  'shouldUpdatePosition',
  'arrowOffsetLeft',
  'arrowOffsetTop',
  'positionLeft',
  'positionTop'
];

const MenuWrapper = ({ className, ...rest }: Object) => (
  <div
    {..._.omit(rest, placementProps)}
    className={classNames(`${namespace}-menu`, className)}
  />
);

export default MenuWrapper;
