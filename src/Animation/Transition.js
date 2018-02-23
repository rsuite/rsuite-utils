
// @flow

import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { on, transition } from 'dom-lib';
import classNames from 'classnames';
import _ from 'lodash';
import type { ReactFindDOMNode, DefaultEvent, AnimationEventFunction } from '../utils/TypeDefinition';

export const UNMOUNTED = 0;
export const EXITED = 1;
export const ENTERING = 2;
export const ENTERED = 3;
export const EXITING = 4;

function noop() { }

type Props = {
  children?: React.Node,
  className?: string,
  in?: boolean,
  unmountOnExit?: boolean,
  transitionAppear?: boolean,
  timeout?: number,
  exitedClassName?: string,
  exitingClassName?: string,
  enteredClassName?: string,
  enteringClassName?: string,

  exitedClassName?: string,
  exitingClassName?: string,
  enteredClassName?: string,
  enteringClassName?: string,

  onEnter: AnimationEventFunction,
  onEntering: AnimationEventFunction,
  onEntered: AnimationEventFunction,
  onExit: AnimationEventFunction,
  onExiting: AnimationEventFunction,
  onExited: AnimationEventFunction
}


type States = {
  status?: number
}

class Transition extends React.Component<Props, States> {

  static displayName = 'Transition';
  /**
   * Note that `handledProps` are generated automatically during
   * build with `babel-plugin-transform-react-flow-handled-props`
   */
  static handledProps = [];
  static defaultProps = {
    timeout: 1000,

    onEnter: noop,
    onEntering: noop,
    onEntered: noop,

    onExit: noop,
    onExiting: noop,
    onExited: noop
  };

  constructor(props: Props) {
    super(props);

    let initialStatus: number;
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

  componentWillReceiveProps(nextProps: Props) {
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
    const { status } = this.state;
    const { unmountOnExit } = this.props;

    if (unmountOnExit && status === EXITED) {

      if (this.props.in) {
        this.performEnter(this.props);
      } else {
        /*eslint-disable*/
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

  onTransitionEnd(node: ReactFindDOMNode, handler: Function) {
    this.setNextCallback(handler);

    if (node) {
      on(node, transition.end, this.nextCallback);
      setTimeout(this.nextCallback, this.props.timeout);
    } else {
      setTimeout(this.nextCallback, 0);
    }
  }

  setNextCallback(callback: (event: DefaultEvent) => void) {
    let active = true;

    this.nextCallback = (event: any) => {
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

  performEnter(props: Props) {

    const { onEnter, onEntering, onEntered } = props || this.props;

    this.cancelNextCallback();
    const node: ReactFindDOMNode = findDOMNode(this);

    onEnter(node);

    this.safeSetState({
      status: ENTERING
    }, () => {
      onEntering(node);
      this.onTransitionEnd(node, () => {
        this.safeSetState({
          status: ENTERED
        }, () => {
          onEntered(node);
        });
      });
    });
  }

  performExit(props: Props) {
    const { onExit, onExiting, onExited } = props || this.props;

    this.cancelNextCallback();
    const node = findDOMNode(this);
    onExit(node);

    this.safeSetState({
      status: EXITING
    }, () => {
      onExiting(node);

      this.onTransitionEnd(node, () => {
        this.safeSetState({
          status: EXITED
        }, () => {
          onExited(node);
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

  safeSetState(nextState: States, callback: Function) {
    this.setState(nextState, this.setNextCallback(callback));
  }

  nextCallback: any = null;
  needsUpdate = null;

  render() {

    const status = this.state.status;

    if (status === UNMOUNTED) {
      return null;
    }

    const {
      children,
      className,
      exitedClassName,
      enteringClassName,
      enteredClassName,
      exitingClassName,
      ...rest
    } = this.props;


    const childProps = _.omit(rest, Transition.handledProps);

    let transitionClassName;
    if (status === EXITED) {
      transitionClassName = exitedClassName;
    } else if (status === ENTERING) {
      transitionClassName = enteringClassName;
    } else if (status === ENTERED) {
      transitionClassName = enteredClassName;
    } else if (status === EXITING) {
      transitionClassName = exitingClassName;
    }

    const child = React.Children.only(children);

    return React.cloneElement(child, {
      ...childProps,
      className: classNames(child.props.className, className, transitionClassName)
    });
  }
}


export default Transition;
