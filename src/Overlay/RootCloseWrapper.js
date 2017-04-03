import React from 'react';
import ReactDOM from 'react-dom';
import { on, contains } from 'dom-lib';

function isLeftClickEvent(event) {
    return event.button === 0;
}

function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

const propTypes = {
    onRootClose: React.PropTypes.func.isRequired
};

class RootCloseWrapper extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleDocumentClick = this.handleDocumentClick.bind(this);
        this.handleDocumentKeyUp = this.handleDocumentKeyUp.bind(this);
    }

    componentDidMount() {
        this.bindRootCloseHandlers();
    },
    componentWillUnmount() {
        this.unbindRootCloseHandlers();
    },
    bindRootCloseHandlers() {
        let doc = window.document;
        this._onDocumentClickListener = on(doc, 'click', this.handleDocumentClick);
        this._onDocumentKeyupListener = on(doc, 'keyup', this.handleDocumentKeyUp);
    },
    handleDocumentClick(event) {
        if (contains(ReactDOM.findDOMNode(this), event.target)) {
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
        if (this._onDocumentClickListener) {
            this._onDocumentClickListener.off();
        }

        if (this._onDocumentKeyupListener) {
            this._onDocumentKeyupListener.off();
        }
    }

    render() {
        return this.props.children;
    }
}

RootCloseWrapper.propTypes = propTypes;

export default RootCloseWrapper;
