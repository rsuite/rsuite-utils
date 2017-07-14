import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import { mountable, elementType } from '../propTypes';
import Portal from './Portal';
import ModalManager from './ModalManager';
import {
  ownerDocument,
  canUseDom,
  activeElement,
  contains,
  getContainer,
  on,
  onFocus
} from 'dom-lib';



const modalManager = new ModalManager();
const noop = () => { };

class Modal extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = { exited: !props.show };
    this.handleBackdropClick = this.handleBackdropClick.bind(this);
    this.handleDocumentKeyUp = this.handleDocumentKeyUp.bind(this);
    this.handleHidden = this.handleHidden.bind(this);
    this.enforceFocus = this.enforceFocus.bind(this);

  }

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

  componentDidMount() {
    if (this.props.show) {
      this.onShow();
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
    this._onDocumentKeyupListener = on(doc, 'keyup', this.handleDocumentKeyUp);
    this._onFocusinListener = onFocus(this.enforceFocus);

    this.focus();

    if (this.props.onShow) {
      this.props.onShow();
    }
  }

  onHide() {
    modalManager.remove(this);

    if (this._onDocumentKeyupListener) {
      this._onDocumentKeyupListener.off();
    }

    if (this._onFocusinListener) {
      this._onFocusinListener.off();
    }

    this.restoreLastFocus();
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

  focus() {
    let autoFocus = this.props.autoFocus;
    let modalContent = this.getDialogElement();
    let current = activeElement(ownerDocument(this));
    let focusInModal = current && contains(modalContent, current);

    if (modalContent && autoFocus && !focusInModal) {
      this.lastFocus = current;

      if (!modalContent.hasAttribute('tabIndex')) {
        modalContent.setAttribute('tabIndex', -1);
        new Error(false, 'The modal content node does not accept focus. ' + 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".');
      }

      modalContent.focus();
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

  //instead of a ref, which might conflict with one the parent applied.
  getDialogElement() {
    let node = this.modal;
    return node && node.lastChild;
  }

  isTopModal() {
    return modalManager.isTopModal(this);
  }

  renderBackdrop() {

    let { transition: Transition, backdropTransitionTimeout } = this.props;
    let backdrop = (
      <div ref={ref => this.backdrop = ref}
        style={this.props.backdropStyle}
        className={this.props.backdropClassName}
        onClick={this.handleBackdropClick}
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
      <Portal ref={ref => this.mountNode = ref ? ref.getMountNode() : ref} container={props.container}>
        <div
          ref={ref => this.modal = ref}
          role={props.role || 'dialog'}
          style={props.style}
          className={props.className}>
          {backdrop && this.renderBackdrop()}
          {dialog}
        </div>
      </Portal>
    );
  }
}

Modal.manager = modalManager;

export default Modal;
