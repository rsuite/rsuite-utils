// @flow

import * as React from 'react';
import Portal from './Portal';
import Position from './Position';
import RootCloseWrapper from './RootCloseWrapper';

import type {
  AnimationEventFunction,
  DefaultEventFunction,
  Placement
} from '../utils/TypeDefinition';

type Props = {
  container?: HTMLElement | (() => HTMLElement),
  onRendered?: Function,
  children?: React.Node,
  className?: string,
  target?: Function,
  containerPadding?: number,
  placement?: Placement,
  shouldUpdatePosition?: boolean,

  show?: boolean,
  rootClose?: boolean,
  onHide?: DefaultEventFunction,
  transition?: React.ElementType,
  onEnter?: AnimationEventFunction,
  onEntering?: AnimationEventFunction,
  onEntered?: AnimationEventFunction,
  onExit?: AnimationEventFunction,
  onExiting?: AnimationEventFunction,
  onExited?: AnimationEventFunction,
  positionRef?: React.ElementRef<*>
};

type States = {
  exited?: boolean
};

class Overlay extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = { exited: !props.show };
  }

  componentWillReceiveProps(nextProps: Object) {
    if (nextProps.show) {
      this.setState({ exited: false });
    } else if (!nextProps.transition) {
      this.setState({ exited: true });
    }
  }

  handleHidden = (...args: Array<any>) => {
    this.setState({ exited: true });
    const { onExited } = this.props;
    onExited && onExited(...args);
  };

  render() {
    const {
      container,
      containerPadding,
      target,
      placement,
      shouldUpdatePosition,
      rootClose,
      children,
      transition: Transition,
      show,
      onHide,
      positionRef,
      ...props
    } = this.props;

    const mountOverlay = show || (Transition && !this.state.exited);

    if (!mountOverlay) {
      return null;
    }

    let child = children;

    child = (
      <Position
        {...{ container, containerPadding, target, placement, shouldUpdatePosition }}
        ref={positionRef}
      >
        {child}
      </Position>
    );

    if (Transition) {
      let { onExit, onExiting, onEnter, onEntering, onEntered } = props;
      child = (
        <Transition
          in={show}
          transitionAppear
          onExit={onExit}
          onExiting={onExiting}
          onExited={this.handleHidden}
          onEnter={onEnter}
          onEntering={onEntering}
          onEntered={onEntered}
        >
          {child}
        </Transition>
      );
    }

    if (rootClose) {
      child = (
        <RootCloseWrapper target={target} onRootClose={onHide}>
          {child}
        </RootCloseWrapper>
      );
    }

    return <Portal container={container}>{child}</Portal>;
  }
}

export default Overlay;
