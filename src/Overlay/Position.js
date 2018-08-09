// @flow

import * as React from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import _ from 'lodash';
import { ownerDocument, getContainer } from 'dom-lib';
import overlayPositionUtils from '../utils/overlayPositionUtils';
import shallowEqual from '../utils/shallowEqual';
import type { Placement } from '../utils/TypeDefinition';

export type Props = {
  children?: React.Node,
  className?: string,
  target?: Function,
  container?: HTMLElement | (() => HTMLElement),
  containerPadding?: number,
  placement?: Placement,
  shouldUpdatePosition?: boolean
};

type State = {
  positionLeft?: number,
  positionTop?: number,
  arrowOffsetLeft?: null | number,
  arrowOffsetTop?: null | number,
  positionClassName?: string
};

class Position extends React.Component<Props, State> {
  static displayName = 'Position';
  static defaultProps = {
    containerPadding: 0,
    placement: 'right',
    shouldUpdatePosition: false
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      positionLeft: 0,
      positionTop: 0,
      arrowOffsetLeft: null,
      arrowOffsetTop: null
    };
  }

  componentDidMount() {
    this.updatePosition();
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    if (!shallowEqual(nextProps, this.props)) {
      this.needsFlush = true;
      return true;
    }

    if (!shallowEqual(nextState, this.state)) {
      return true;
    }

    return false;
  }

  componentDidUpdate(prevProps: Props) {
    if (this.needsFlush) {
      this.needsFlush = false;
      this.updatePosition(prevProps.placement !== this.props.placement);
    }
  }

  componentWillUnmount() {
    this.lastTarget = null;
  }

  getTargetSafe() {
    const { target } = this.props;
    if (!target) {
      return null;
    }

    const targetSafe = target(this.props);

    if (!targetSafe) {
      return null;
    }

    return targetSafe;
  }

  lastTarget = false;
  needsFlush = null;

  updatePosition(placementChanged?: boolean) {
    const target = this.getTargetSafe();
    const { shouldUpdatePosition, placement, containerPadding } = this.props;

    if (!shouldUpdatePosition && target === this.lastTarget && !placementChanged) {
      return;
    }

    this.lastTarget = target;

    if (!target) {
      this.setState({
        positionLeft: 0,
        positionTop: 0,
        arrowOffsetLeft: null,
        arrowOffsetTop: null
      });
      return;
    }

    /* eslint-disable */
    const overlay = findDOMNode(this);
    const container = getContainer(this.props.container, ownerDocument(this).body);
    const nextPosition = overlayPositionUtils.calcOverlayPosition(
      placement,
      overlay,
      target,
      container,
      containerPadding
    );
    this.setState(nextPosition);
  }

  render() {
    const { children, className, ...rest } = this.props;
    const { positionLeft, positionTop, positionClassName, ...arrowPosition } = this.state;
    const child = React.Children.only(children);

    return React.cloneElement(child, {
      ..._.omit(rest, ['target', 'container', 'containerPadding']),
      ...arrowPosition,
      positionLeft,
      positionTop,
      className: classNames(className, positionClassName, child.props.className),
      style: {
        ...child.props.style,
        left: positionLeft,
        top: positionTop
      }
    });
  }
}

export default Position;
