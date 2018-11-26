import React from 'react';
import { Modal } from '../src/Overlay';
import { Bounce } from '../src/Animation';

class ModalDemo extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.handleChangeBackdrop = this.handleChangeBackdrop.bind(this);
    this.state = {
      show: false,
      backdrop: true
    };
  }

  handleOpenModal() {
    this.setState({
      show: true
    });
  }

  handleChangeBackdrop(event) {
    const backdropValues = [true, false, 'static'];

    this.setState({
      backdrop: backdropValues[event.target.value]
    });
  }
  handleHide(e) {
    if (e && e.target !== e.currentTarget) {
      return;
    }

    if (this.state.backdrop !== true) {
      return;
    }
    this.setState({
      show: false
    });
  }

  render() {
    const { backdrop, show } = this.state;
    return (
      <div className="row">
        <h2>Modal</h2>
        <button onClick={this.handleOpenModal}>open modal</button>
        <select onChange={this.handleChangeBackdrop} defaultValue={0}>
          <option value={0}>true</option>
          <option value={1}>false</option>
          <option value={2}>static</option>
        </select>
        <Modal
          backdrop={backdrop}
          transition={Bounce}
          backdropClassName={'modal-backdrop'}
          containerClassName={'modal-open'}
          onHide={this.handleHide}
          show={show}
        >
          <div
            className="modal"
            style={{
              display: this.state.show ? 'block' : 'none'
            }}
            onClick={this.handleHide}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">Header</div>
                <div className="modal-body">Body</div>
                <div className="modal-footer">Footer</div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default ModalDemo;
