import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { on, transition } from 'dom-lib';
import classNames from 'classnames';


export const UNMOUNTED = 0;
export const EXITED = 1;
export const ENTERING = 2;
export const ENTERED = 3;
export const EXITING = 4;

function noop() { }

class Transition extends React.Component {

  static displayName = 'Transition';
  static propTypes = {
    in: PropTypes.bool,
    unmountOnExit: PropTypes.bool,
    transitionAppear: PropTypes.bool,
    timeout: PropTypes.number,
    exitedClassName: PropTypes.string,
    exitingClassName: PropTypes.string,
    enteredClassName: PropTypes.string,
    enteringClassName: PropTypes.string,
    onEnter: PropTypes.func,
    onEntering: PropTypes.func,
    onEntered: PropTypes.func,
    onExit: PropTypes.func,
    onExiting: PropTypes.func,
    onExited: PropTypes.func
  };

  static defaultProps = {
    in: false,
    unmountOnExit: false,
    transitionAppear: false,
    timeout: 5000,

    onEnter: noop,
    onEntering: noop,
    onEntered: noop,

    onExit: noop,
    onExiting: noop,
    onExited: noop
  };

  constructor(props, context) {
    super(props, context);

    let initialStatus;
    if (props.in) {
      initialStatus = props.transitionAppear ? EXITED : ENTERED;
    } else {
      initialStatus = props.unmountOnExit ? UNMOUNTED : EXITED;
    }
    this.state = {
      status: initialStatus
    };

    this.nextCallback = null;
  }

  componentDidMount() {
    if (this.props.transitionAppear && this.props.in) {
      this.performEnter(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.in && this.props.unmountOnExit) {
      if (this.state.status === UNMOUNTED) {
        // Start enter transition in componentDidUpdate.
        this.setState({ status: EXITED });
      }
    } else {
      this.needsUpdate = true;
    }
  }

  componentDidUpdate() {
    const status = this.state.status;

    if (this.props.unmountOnExit && status === EXITED) {

      if (this.props.in) {
        this.performEnter(this.props);
      } else {
        this.setState({ status: UNMOUNTED });
      }
      return;
    }

    if (this.needsUpdate) {
      this.needsUpdate = false;

      if (this.props.in) {
        if (status === EXITING || status === EXITED) {
          this.performEnter(this.props);
        }
      } else if (status === ENTERING || status === ENTERED) {
        this.performExit(this.props);
      }
    }
  }

  componentWillUnmount() {
    this.cancelNextCallback();
  }

  onTransitionEnd(node, handler) {
    this.setNextCallback(handler);

    if (node) {
      on(node, transition.end, this.nextCallback);
      setTimeout(this.nextCallback, this.props.timeout);
    } else {
      setTimeout(this.nextCallback, 0);
    }
  }

  setNextCallback(callback) {
    let active = true;

    this.nextCallback = (event) => {
      if (active) {
        active = false;
        this.nextCallback = null;

        callback(event);
      }
    };

    this.nextCallback.cancel = () => {
      active = false;
    };

    return this.nextCallback;
  }

  performEnter(props) {
    this.cancelNextCallback();
    const node = findDOMNode(this);

    props.onEnter(node);

    this.safeSetState({
      status: ENTERING
    }, () => {
      this.props.onEntering(node);

      this.onTransitionEnd(node, () => {
        this.safeSetState({
          status: ENTERED
        }, () => {
          this.props.onEntered(node);
        });
      });
    });
  }

  performExit(props) {
    this.cancelNextCallback();
    const node = findDOMNode(this);
    props.onExit(node);

    this.safeSetState({
      status: EXITING
    }, () => {
      this.props.onExiting(node);

      this.onTransitionEnd(node, () => {
        this.safeSetState({
          status: EXITED
        }, () => {
          this.props.onExited(node);
        });
      });
    });
  }

  cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  }

  safeSetState(nextState, callback) {
    this.setState(nextState, this.setNextCallback(callback));
  }

  render() {

    const status = this.state.status;

    if (status === UNMOUNTED) {
      return null;
    }

    const {
      children,
      className,
      ...childProps
    } = this.props;

    Object.keys(Transition.propTypes).forEach(key => delete childProps[key]);

    let transitionClassName;
    if (status === EXITED) {
      transitionClassName = this.props.exitedClassName;
    } else if (status === ENTERING) {
      transitionClassName = this.props.enteringClassName;
    } else if (status === ENTERED) {
      transitionClassName = this.props.enteredClassName;
    } else if (status === EXITING) {
      transitionClassName = this.props.exitingClassName;
    }

    const child = React.Children.only(children);

    return React.cloneElement(child, {
      ...childProps,
      className: classNames(child.props.className, className, transitionClassName)
    });
  }
}


export default Transition;
