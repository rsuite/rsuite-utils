import React from 'react';
import { Modal } from '../src/Overlay';
import { Fade } from '../src/Animation';

class ModalDemo extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.state = {
      show: false
    };
  }

  handleOpenModal() {
    this.setState({
      show: true
    });
  }
  handleHide(e) {
    if (e && e.target !== e.currentTarget) {
      return;
    }
    this.setState({
      show: false
    });
  }

  render() {
    return (

      <div className="row">
        <h2>Modal</h2>
        <button onClick={this.handleOpenModal}>open modal</button>
        <Modal
          backdrop
          transition={Fade}
          backdropClassName={'modal-backdrop'}
          containerClassName={'modal-open'}
          onHide={this.handleHide}
          show={this.state.show}>
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
