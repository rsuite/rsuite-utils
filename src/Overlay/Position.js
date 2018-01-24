import React, { cloneElement } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import { ownerDocument, getContainer } from 'dom-lib';
import mountable from '../propTypes/mountable';
import overlayPositionUtils from '../utils/overlayPositionUtils';


class Position extends React.Component {

  static displayName = 'Position';
  static propTypes = {
    target: PropTypes.func,
    container: PropTypes.oneOfType([mountable, PropTypes.func]),
    containerPadding: PropTypes.number,
    placement: PropTypes.oneOf([
      'top', 'right', 'bottom', 'left',
      'bottomLeft', 'bottomRight', 'topLeft', 'topRight',
      'leftTop', 'rightTop', 'leftBottom', 'rightBottom'
    ]),
    shouldUpdatePosition: PropTypes.bool
  };


  static defaultProps = {
    containerPadding: 0,
    placement: 'right',
    shouldUpdatePosition: false
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      positionLeft: 0,
      positionTop: 0,
      arrowOffsetLeft: null,
      arrowOffsetTop: null
    };

    this.needsFlush = false;
    this.lastTarget = null;
  }

  componentDidMount() {
    this.updatePosition();
  }

  componentWillReceiveProps() {
    this.needsFlush = true;
  }

  componentDidUpdate(prevProps) {
    if (this.needsFlush) {
      this.needsFlush = false;
      this.updatePosition(prevProps.placement !== this.props.placement);
    }
  }

  componentWillUnmount() {
    this.lastTarget = null;
  }

  getTargetSafe() {
    if (!this.props.target) {
      return null;
    }

    const target = this.props.target(this.props);
    if (!target) {
      return null;
    }

    return target;
  }

  updatePosition(placementChanged) {
    const target = this.getTargetSafe();

    if (!this.props.shouldUpdatePosition && target === this.lastTarget && !placementChanged) {
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

    this.setState(overlayPositionUtils.calcOverlayPosition(
      this.props.placement,
      overlay,
      target,
      container,
      this.props.containerPadding
    ));
  }

  render() {
    const {
      children,
      className,
      ...props
    } = this.props;

    const {
      positionLeft,
      positionTop,
      ...arrowPosition
    } = this.state;

    const child = React.Children.only(children);

    return cloneElement(child, {
      ..._.omit(props, ['target', 'container', 'containerPadding']),
      ...arrowPosition,
      positionLeft,
      positionTop,
      className: classNames(className, child.props.className),
      style: {
        ...child.props.style,
        left: positionLeft,
        top: positionTop
      }
    });
  }
}

export default Position;
