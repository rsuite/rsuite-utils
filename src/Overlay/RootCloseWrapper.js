// @flow

import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { on, contains } from 'dom-lib';
import _ from 'lodash';

function isLeftClickEvent(event) {
  return _.get(event, 'button') === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || _.get(event, 'shiftKey'));
}

type Props = {
  children: React.Node,
  onRootClose?: () => void
}

class RootCloseWrapper extends React.Component<Props> {

  componentDidMount() {
    this.bindRootCloseHandlers();
  }

  componentWillUnmount() {
    this.unbindRootCloseHandlers();
  }
  onDocumentClickListener = null;
  onDocumentKeyupListener = null;

  bindRootCloseHandlers() {
    let doc = window.document;
    this.onDocumentClickListener = on(doc, 'click', this.handleDocumentClick);
    this.onDocumentKeyupListener = on(doc, 'keyup', this.handleDocumentKeyUp);
  }

  handleDocumentClick = (event: SyntheticEvent<*>) => {

    /* eslint-disable */
    if (contains(findDOMNode(this), event.target)) {
      return;
    }
    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }
    const { onRootClose } = this.props;
    onRootClose && onRootClose();
  }

  handleDocumentKeyUp = (event: SyntheticEvent<*>) => {
    if (event.keyCode === 27) {
      const { onRootClose } = this.props;
      onRootClose && onRootClose();
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
