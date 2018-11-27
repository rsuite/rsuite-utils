// @flow

import * as React from 'react';
import ReactDOM from 'react-dom';
import { ownerDocument, getContainer } from 'dom-lib';

export type Props = {
  container?: HTMLElement | (() => HTMLElement),
  children?: React.Node
};

class Portal extends React.Component<Props> {
  static displayName = 'Portal';

  componentDidMount() {
    this.renderOverlay();
  }
  componentWillReceiveProps(nextProps: Props) {
    if (
      this.overlayTarget &&
      this.portalContainerNode &&
      nextProps.container !== this.props.container
    ) {
      this.portalContainerNode.removeChild(this.overlayTarget);
      this.portalContainerNode = getContainer(nextProps.container, ownerDocument(this).body);
      this.portalContainerNode.appendChild(this.overlayTarget);
    }
  }
  componentDidUpdate() {
    this.renderOverlay();
  }

  componentWillUnmount() {
    this.unrenderOverlay();
    this.unmountOverlayTarget();
  }
  getMountNode() {
    return this.overlayTarget;
  }
  mountOverlayTarget() {
    if (!this.overlayTarget) {
      this.overlayTarget = document.createElement('div');
      this.portalContainerNode = getContainer(this.props.container, ownerDocument(this).body);
      this.portalContainerNode.appendChild(this.overlayTarget);
    }
  }
  unmountOverlayTarget() {
    if (this.overlayTarget && this.portalContainerNode) {
      this.portalContainerNode.removeChild(this.overlayTarget);
      this.overlayTarget = null;
    }
    this.portalContainerNode = null;
  }

  unrenderOverlay() {
    if (this.overlayTarget) {
      ReactDOM.unmountComponentAtNode(this.overlayTarget);
      this.overlayInstance = null;
    }
  }
  overlayTarget = null;
  overlayInstance = null;
  portalContainerNode = null;

  renderOverlay() {
    const { children } = this.props;
    const overlay = !children ? null : React.Children.only(children);

    // Save reference for future access.
    if (overlay !== null) {
      this.mountOverlayTarget();
      this.overlayInstance = ReactDOM.unstable_renderSubtreeIntoContainer(
        this,
        overlay,
        this.overlayTarget
      );
    } else {
      this.unrenderOverlay();
      this.unmountOverlayTarget();
    }
  }

  render() {
    return null;
  }
}

export default Portal;
