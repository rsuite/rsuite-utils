import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getStyle } from 'dom-lib';
import Transition from './Transition';

import createChainedFunction from '../utils/createChainedFunction';

const capitalize = str => str[0].toUpperCase() + str.substr(1);
const triggerBrowserReflow = node => node.offsetHeight;

const MARGINS = {
  height: ['marginTop', 'marginBottom'],
  width: ['marginLeft', 'marginRight']
};

function getDimensionValue(dimension, elem) {
  let value = elem[`offset${capitalize(dimension)}`];
  let margins = MARGINS[dimension];

  return (value +
    parseInt(getStyle(elem, margins[0]), 10) +
    parseInt(getStyle(elem, margins[1]), 10)
  );
}

function getScrollDimensionValue(elem, dimension) {
  const value = elem[`scroll${capitalize(dimension)}`];
  return `${value}px`;
}

class Collapse extends React.Component {

  static displayName = 'Collapse';
  static propTypes = {
    in: PropTypes.bool,
    unmountOnExit: PropTypes.bool,
    transitionAppear: PropTypes.bool,
    timeout: PropTypes.number,
    onEnter: PropTypes.func,
    onEntering: PropTypes.func,
    onEntered: PropTypes.func,
    onExit: PropTypes.func,
    onExiting: PropTypes.func,
    onExited: PropTypes.func,
    dimension: PropTypes.oneOfType([
      PropTypes.oneOf(['height', 'width']),
      PropTypes.func
    ]),
    getDimensionValue: PropTypes.func,
    role: PropTypes.string,
    exitedClassName: PropTypes.string,
    exitingClassName: PropTypes.string,
    enteredClassName: PropTypes.string,
    enteringClassName: PropTypes.string
  };

  static defaultProps = {
    timeout: 300,
    dimension: 'height',
    exitedClassName: 'collapse',
    exitingClassName: 'collapsing',
    enteredClassName: 'collapse in',
    enteringClassName: 'collapsing',
    getDimensionValue
  };

  constructor(props, context) {
    super(props, context);

    this.onEnterListener = this.handleEnter.bind(this);
    this.onEnteringListener = this.handleEntering.bind(this);
    this.onEnteredListener = this.handleEntered.bind(this);
    this.onExitListener = this.handleExit.bind(this);
    this.onExitingListener = this.handleExiting.bind(this);
  }

  // for testing
  getTransitionInstance() {
    return this.transition;
  }

  handleEnter(elem) {
    let dimension = this.dimension();
    elem.style[dimension] = '0';
  }

  handleEntering(elem) {
    let dimension = this.dimension();

    elem.style[dimension] = getScrollDimensionValue(elem, dimension);
  }

  handleEntered(elem) {
    let dimension = this.dimension();
    elem.style[dimension] = null;
  }

  /* -- Collapsing -- */
  handleExit(elem) {
    const dimension = this.dimension();
    const value = this.props.getDimensionValue(dimension, elem);
    elem.style[dimension] = `${value}px`;
  }

  handleExiting(elem) {
    let dimension = this.dimension();

    triggerBrowserReflow(elem);
    elem.style[dimension] = '0';
  }

  dimension() {
    return typeof this.props.dimension === 'function' ? this.props.dimension() : this.props.dimension;
  }

  render() {

    const {
      dimension,
      getDimensionValue, //eslint-disable-line
      role,
      className,
      onExited,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      ...props
    } = this.props;

    const enter = createChainedFunction(this.onEnterListener, onEnter);
    const entering = createChainedFunction(this.onEnteringListener, onEntering);
    const entered = createChainedFunction(this.onEnteredListener, onEntered);
    const exit = createChainedFunction(this.onExitListener, onExit);
    const exiting = createChainedFunction(this.onExitingListener, onExiting);

    return (
      <Transition
        {...props}
        ref={(ref) => {
          this.transition = ref;
        }}
        aria-expanded={role ? this.props.in : null}
        className={classNames(className, { width: this.dimension() === 'width' })}
        onEnter={enter}
        onEntering={entering}
        onEntered={entered}
        onExit={exit}
        onExiting={exiting}
        onExited={onExited}
      />
    );
  }


}

export default Collapse;
