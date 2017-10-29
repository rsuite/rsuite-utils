import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { on, contains } from 'dom-lib';

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

class RootCloseWrapper extends React.Component {

  static propTypes = {
    onRootClose: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.handleDocumentKeyUp = this.handleDocumentKeyUp.bind(this);
  }

  componentDidMount() {
    this.bindRootCloseHandlers();
  }

  componentWillUnmount() {
    this.unbindRootCloseHandlers();
  }

  bindRootCloseHandlers() {
    let doc = window.document;
    this.onDocumentClickListener = on(doc, 'click', this.handleDocumentClick);
    this.onDocumentKeyupListener = on(doc, 'keyup', this.handleDocumentKeyUp);
  }

  handleDocumentClick(event) {
    /* eslint-disable */
    if (contains(findDOMNode(this), event.target)) {
      return;
    }
    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }
    this.props.onRootClose();
  }

  handleDocumentKeyUp(event) {
    if (event.keyCode === 27) {
      this.props.onRootClose();
    }
  }

  unbindRootCloseHandlers() {
    if (this.onDocumentClickListener) {
      this.onDocumentClickListener.off();
    }

    if (this.onDocumentKeyupListener) {
      this.onDocumentKeyupListener.off();
    }
  }

  render() {
    return this.props.children;
  }
}

export default RootCloseWrapper;
