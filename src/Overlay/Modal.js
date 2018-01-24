import React, { cloneElement } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {
  ownerDocument,
  canUseDom,
  activeElement,
  contains,
  getContainer,
  on,
  onFocus
} from 'dom-lib';

import { mountable, elementType } from '../propTypes';
import Portal from './Portal';
import ModalManager from './ModalManager';
import RefHolder from './RefHolder';


const modalManager = new ModalManager();
const noop = () => { };

class Modal extends React.Component {
  static propTypes = {
    ...Portal.propTypes,

    show: PropTypes.bool,
    container: PropTypes.oneOfType([mountable, PropTypes.func]),
    onShow: PropTypes.func,
    onHide: PropTypes.func,
    backdrop: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf(['static'])
    ]),
    onEscapeKeyUp: PropTypes.func,
    onBackdropClick: PropTypes.func,
    /*eslint-disable */
    backdropStyle: PropTypes.object,
    backdropClassName: PropTypes.string,
    containerClassName: PropTypes.string,
    keyboard: PropTypes.bool,
    transition: elementType,
    dialogTransitionTimeout: PropTypes.number,
    backdropTransitionTimeout: PropTypes.number,
    autoFocus: PropTypes.bool,
    enforceFocus: PropTypes.bool,
    onEnter: PropTypes.func,
    onEntering: PropTypes.func,
    onEntered: PropTypes.func,
    onExit: PropTypes.func,
    onExiting: PropTypes.func,
    onExited: PropTypes.func

  };

  static defaultProps = {
    show: false,
    backdrop: true,
    keyboard: true,
    autoFocus: true,
    enforceFocus: true,
    onHide: noop
  };

  constructor(props, context) {
    super(props, context);
    this.state = { exited: !props.show };
    this.handleBackdropClick = this.handleBackdropClick.bind(this);
    this.handleDocumentKeyUp = this.handleDocumentKeyUp.bind(this);
    this.handleHidden = this.handleHidden.bind(this);
    this.enforceFocus = this.enforceFocus.bind(this);

  }
  componentDidMount() {
    if (this.props.show) {
      this.onShow();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show) {
      this.setState({ exited: false });
    } else if (!nextProps.transition) {
      // Otherwise let handleHidden take care of marking exited.
      this.setState({ exited: true });
    }
  }

  componentWillUpdate(nextProps) {
    if (!this.props.show && nextProps.show) {
      this.checkForFocus();
    }
  }

  componentDidUpdate(prevProps) {
    let { transition } = this.props;

    if (prevProps.show && !this.props.show && !transition) {
      // Otherwise handleHidden will call this.
      this.onHide();
    } else if (!prevProps.show && this.props.show) {
      this.onShow();
    }

  }

  componentWillUnmount() {
    let { show, transition } = this.props;

    if (show || (transition && !this.state.exited)) {
      this.onHide();
    }
  }

  onShow() {
    let doc = ownerDocument(this);
    let container = getContainer(this.props.container, doc.body);


    modalManager.add(this, container, this.props.containerClassName);
    this.onDocumentKeyupListener = on(doc, 'keyup', this.handleDocumentKeyUp);
    this.onFocusinListener = onFocus(this.enforceFocus);

    if (this.props.onShow) {
      this.props.onShow();
    }
  }

  onHide() {
    modalManager.remove(this);

    if (this.onDocumentKeyupListener) {
      this.onDocumentKeyupListener.off();
    }

    if (this.onFocusinListener) {
      this.onFocusinListener.off();
    }

    this.restoreLastFocus();
  }

  getDialogElement() {
    return ReactDOM.findDOMNode(this.dialog);
  }

  handleHidden(...args) {
    this.setState({ exited: true });
    this.onHide();

    if (this.props.onExited) {
      this.props.onExited(...args);
    }
  }

  handleBackdropClick(e) {


    if (e.target !== e.currentTarget) {
      return;
    }

    if (this.props.onBackdropClick) {
      this.props.onBackdropClick(e);
    }


    if (this.props.backdrop === true) {
      this.props.onHide();
    }
  }

  handleDocumentKeyUp(e) {
    if (this.props.keyboard && e.keyCode === 27 && this.isTopModal()) {
      if (this.props.onEscapeKeyUp) {
        this.props.onEscapeKeyUp(e);
      }
      this.props.onHide();
    }
  }

  checkForFocus() {
    if (canUseDom) {
      this.lastFocus = activeElement();
    }
  }

  restoreLastFocus() {
    // Support: <=IE11 doesn't support `focus()` on svg elements (RB: #917)
    if (this.lastFocus && this.lastFocus.focus) {
      this.lastFocus.focus();
      this.lastFocus = null;
    }
  }

  enforceFocus() {
    let { enforceFocus } = this.props;

    if (!enforceFocus || !this.isTopModal()) {
      return;
    }

    let active = activeElement(ownerDocument(this));
    let modal = this.getDialogElement();

    if (modal && modal !== active && !contains(modal, active)) {
      modal.focus();
    }
  }

  isTopModal() {
    return modalManager.isTopModal(this);
  }

  setMountNodeRef = (ref) => {
    this.mountNode = ref ? ref.getMountNode() : ref;
  }

  setModalNodeRef = (ref) => {
    this.modalNode = ref;
  }

  setDialogRef = (ref) => {
    this.dialog = ref;
  };


  renderBackdrop() {

    const {
      transition: Transition,
      backdropTransitionTimeout,
      backdropStyle,
      backdropClassName
    } = this.props;

    let backdrop = (
      <div
        ref={(ref) => {
          this.backdrop = ref;
        }}
        style={backdropStyle}
        className={backdropClassName}
        onClick={this.handleBackdropClick}
        role="button"
        tabIndex={-1}
      />
    );

    if (Transition) {
      backdrop = (
        <Transition
          transitionAppear
          in={this.props.show}
          timeout={backdropTransitionTimeout}
        >
          {backdrop}
        </Transition>
      );
    }

    return backdrop;
  }

  render() {
    let {
      children,
      transition: Transition,
      backdrop,
      dialogTransitionTimeout,
      ...props
    } = this.props;

    let { onExit, onExiting, onEnter, onEntering, onEntered } = props;

    let show = !!props.show;
    let dialog = React.Children.only(this.props.children);

    const mountModal = show || (Transition && !this.state.exited);

    if (!mountModal) {
      return null;
    }

    let { role, tabIndex } = dialog.props;

    if (role === undefined || tabIndex === undefined) {
      dialog = cloneElement(dialog, {
        role: role === undefined ? 'document' : role,
        tabIndex: tabIndex === null ? '-1' : tabIndex
      });
    }

    if (Transition) {
      dialog = (
        <Transition
          transitionAppear
          unmountOnExit
          in={show}
          timeout={dialogTransitionTimeout}
          onExit={onExit}
          onExiting={onExiting}
          onExited={this.handleHidden}
          onEnter={onEnter}
          onEntering={onEntering}
          onEntered={onEntered}
        >
          {dialog}
        </Transition>
      );
    }


    return (
      <Portal
        ref={this.setMountNodeRef}
        container={props.container}
      >
        <div
          ref={this.setModalNodeRef}
          role={props.role || 'dialog'}
          style={props.style}
          className={props.className}
        >
          {backdrop && this.renderBackdrop()}
          <RefHolder ref={this.setDialogRef}>
            {dialog}
          </RefHolder>
        </div>
      </Portal>
    );
  }
}

Modal.manager = modalManager;

export default Modal;
