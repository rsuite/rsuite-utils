import React from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { ownerDocument, getContainer } from 'dom-lib';
import mountable from '../propTypes/mountable';

class Portal extends React.Component {

  static displayName = 'Portal';
  static propTypes = {
    container: PropTypes.oneOfType([
      mountable,
      PropTypes.func
    ])
  };

  componentDidMount() {
    this.renderOverlay();
  }
  componentWillReceiveProps(nextProps) {

    if (this.overlayTarget && nextProps.container !== this.props.container) {
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
  getOverlayDOMNode() {
    if (!this.isMounted()) { //eslint-disable-line
      throw new Error('getOverlayDOMNode(): A component must be mounted to have a DOM node.');
    }

    if (this.overlayInstance) {
      if (this.overlayInstance.getWrappedDOMNode) {
        return this.overlayInstance.getWrappedDOMNode();
      }
      /* eslint-disable */
      return findDOMNode(this.overlayInstance);
    }

    return null;
  }
  mountOverlayTarget() {
    if (!this.overlayTarget) {
      this.overlayTarget = document.createElement('div');
      this.portalContainerNode = getContainer(this.props.container, ownerDocument(this).body);
      this.portalContainerNode.appendChild(this.overlayTarget);
    }
  }
  unmountOverlayTarget() {
    if (this.overlayTarget) {
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

  renderOverlay() {

    let overlay = !this.props.children
      ? null
      : React.Children.only(this.props.children);

    // Save reference for future access.
    if (overlay !== null) {
      this.mountOverlayTarget();
      this.overlayInstance = ReactDOM.unstable_renderSubtreeIntoContainer(
        this, overlay, this.overlayTarget
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
