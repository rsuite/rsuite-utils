// @flow

import * as React from 'react';
import classNames from 'classnames';

import BaseOverlay from './BaseOverlay';
import Fade from '../Animation/Fade';

import type {
  AnimationEventFunction,
  DefaultEventFunction,
  Placement
} from '../utils/TypeDefinition';

type Props = {
  container?: HTMLElement | (() => HTMLElement),
  onRendered?: Function,
  children: React.Element<any>,
  className?: string,
  target?: Function,
  container?: HTMLElement | (() => HTMLElement),
  containerPadding?: number,
  placement?: Placement,
  shouldUpdatePosition?: boolean,

  onEnter?: AnimationEventFunction,
  onEntering?: AnimationEventFunction,
  onEntered?: AnimationEventFunction,
  onExit?: AnimationEventFunction,
  onExiting?: AnimationEventFunction,
  onExited?: AnimationEventFunction,

  show?: boolean,
  rootClose?: boolean,
  onHide?: DefaultEventFunction,
  transition?: React.ElementType,
  animation?: boolean,
  positionRef?: React.ElementRef<*>
};

class Overlay extends React.Component<Props> {
  /**
   * Note that `handledProps` are generated automatically during
   * build with `babel-plugin-transform-react-flow-handled-props`
   */
  static handledProps = [];
  static defaultProps = {
    animation: true,
    transition: Fade
  };

  render() {
    let { children: child, animation, transition, ...props } = this.props;

    if (!animation) {
      transition = undefined;
    }

    if (!transition) {
      child = React.Children.only(child);
      child = React.cloneElement(child, {
        className: classNames('in', child.props.className)
      });
    }

    return (
      <BaseOverlay {...props} transition={transition}>
        {child}
      </BaseOverlay>
    );
  }
}

export default Overlay;
