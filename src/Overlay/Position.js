import React, { cloneElement } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ownerDocument, getContainer } from 'dom-lib';
import mountable from '../propTypes/mountable';
import overlayPositionUtils from './overlayPositionUtils';



class Position extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      positionLeft: 0,
      positionTop: 0,
      arrowOffsetLeft: null,
      arrowOffsetTop: null
    };

    this._needsFlush = false;
    this._lastTarget = null;
  }

  static displayName = 'Position';
  static propTypes = {
    target: PropTypes.func,
    container: PropTypes.oneOfType([mountable, PropTypes.func]),
    containerPadding: PropTypes.number,
    placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    shouldUpdatePosition: PropTypes.bool
  };

  static defaultProps = {
    containerPadding: 0,
    placement: 'right',
    shouldUpdatePosition: false
  };

  componentDidMount() {
    this.updatePosition();
  }

  componentWillReceiveProps() {
    this._needsFlush = true;
  }

  componentDidUpdate(prevProps) {
    if (this._needsFlush) {
      this._needsFlush = false;
      this.updatePosition(prevProps.placement !== this.props.placement);
    }
  }

  componentWillUnmount() {
    this._lastTarget = null;
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

    delete props.target;
    delete props.container;
    delete props.containerPadding;

    const child = React.Children.only(children);

    return cloneElement(child, {
      ...props,
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

    if (!this.props.shouldUpdatePosition && target === this._lastTarget && !placementChanged) {
      return;
    }

    this._lastTarget = target;

    if (!target) {
      this.setState({ positionLeft: 0, positionTop: 0, arrowOffsetLeft: null, arrowOffsetTop: null });

      return;
    }

    const overlay = ReactDOM.findDOMNode(this);
    const container = getContainer(this.props.container, ownerDocument(this).body);

    this.setState(overlayPositionUtils.calcOverlayPosition(this.props.placement, overlay, target, container, this.props.containerPadding));
  }
}


export default Position;
