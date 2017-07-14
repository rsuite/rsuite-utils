import React from 'react';
import PropTypes from 'prop-types';
import Portal from './Portal';
import Position from './Position';
import RootCloseWrapper from './RootCloseWrapper';
import elementType from '../propTypes/elementType';

class Overlay extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = { exited: !props.show };
    this.onHiddenListener = this.handleHidden.bind(this);
  }

  static propTypes = {
    ...Portal.propTypes,
    ...Position.propTypes,

    show: PropTypes.bool,
    rootClose: PropTypes.bool,
    onHide: PropTypes.func,
    transition: elementType,
    onEnter: PropTypes.func,
    onEntering: PropTypes.func,
    onEntered: PropTypes.func,
    onExit: PropTypes.func,
    onExiting: PropTypes.func,
    onExited: PropTypes.func
  }

  componentWillReceiveProps(nextProps: Object) {
    if (nextProps.show) {
      this.setState({ exited: false });
    } else if (!nextProps.transition) {
      this.setState({ exited: true });
    }
  }

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
      ...props
    } = this.props;

    const mountOverlay = props.show || (Transition && !this.state.exited);

    if (!mountOverlay) {
      return null;
    }

    let child = children;

    child = (
      <Position {...{ container, containerPadding, target, placement, shouldUpdatePosition }}>
        {child}
      </Position>
    );

    if (Transition) {
      let { onExit, onExiting, onEnter, onEntering, onEntered } = props;
      child = (
        <Transition
          in={props.show}
          transitionAppear
          onExit={onExit}
          onExiting={onExiting}
          onExited={this.onHiddenListener}
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
        <RootCloseWrapper onRootClose={props.onHide}>
          {child}
        </RootCloseWrapper>
      );
    }

    return (
      <Portal container={container}>
        {child}
      </Portal>
    );
  }

  handleHidden(...args) {
    this.setState({ exited: true });

    if (this.props.onExited) {
      this.props.onExited(...args);
    }
  }
}


export default Overlay;
