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



class Collapse extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.onEnterListener = this.handleEnter.bind(this);
    this.onEnteringListener = this.handleEntering.bind(this);
    this.onEnteredListener = this.handleEntered.bind(this);
    this.onExitListener = this.handleExit.bind(this);
    this.onExitingListener = this.handleExiting.bind(this);
  }

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
    role: PropTypes.string
  };

  static defaultProps = {
    in: false,
    timeout: 300,
    unmountOnExit: false,
    transitionAppear: false,
    dimension: 'height',
    getDimensionValue
  };

  render() {
    const enter = createChainedFunction(this.onEnterListener, this.props.onEnter);
    const entering = createChainedFunction(this.onEnteringListener, this.props.onEntering);
    const entered = createChainedFunction(this.onEnteredListener, this.props.onEntered);
    const exit = createChainedFunction(this.onExitListener, this.props.onExit);
    const exiting = createChainedFunction(this.onExitingListener, this.props.onExiting);
    const { dimension, getDimensionValue, role, className, onExited, ...props } = this.props;
    return (
      <Transition
        {...props}
        ref={ref => this.transition = ref}
        aria-expanded={role ? this.props.in : null}
        className={classNames(className, { width: this._dimension() === 'width' })}
        exitedClassName="collapse"
        exitingClassName="collapsing"
        enteredClassName="collapse in"
        enteringClassName="collapsing"
        onEnter={enter}
        onEntering={entering}
        onEntered={entered}
        onExit={exit}
        onExiting={exiting}
        onExited={onExited}
      />
    );
  }

  /* -- Expanding -- */
  handleEnter(elem) {
    let dimension = this._dimension();
    elem.style[dimension] = '0';
  }

  handleEntering(elem) {
    let dimension = this._dimension();

    elem.style[dimension] = this._getScrollDimensionValue(elem, dimension);
  }

  handleEntered(elem) {
    let dimension = this._dimension();
    elem.style[dimension] = null;
  }

  /* -- Collapsing -- */
  handleExit(elem) {
    let dimension = this._dimension();

    elem.style[dimension] = this.props.getDimensionValue(dimension, elem) + 'px';
  }

  handleExiting(elem) {
    let dimension = this._dimension();

    triggerBrowserReflow(elem);
    elem.style[dimension] = '0';
  }

  _dimension() {
    return typeof this.props.dimension === 'function'
      ? this.props.dimension()
      : this.props.dimension;
  }

  // for testing
  _getTransitionInstance() {
    return this.transition;
  }

  _getScrollDimensionValue(elem, dimension) {
    return elem[`scroll${capitalize(dimension)}`] + 'px';
  }
}

export default Collapse;
