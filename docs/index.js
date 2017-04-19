import React from 'react';
import ReactDOM from 'react-dom';
import { Modal } from '../src/Overlay';
import { Fade } from '../src/Animation';

import './less/index.less';

class App extends React.Component {
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
  handleHide() {
    this.setState({
      show: false
    });
  }

  render() {
    return (
      <div className="doc-page">
        <div className="container">
          <h1>RSuite Utils</h1>
          <button onClick={this.handleOpenModal}>open modal</button>
          <Modal
            backdrop
            transition={Fade}
            backdropClassName={'modal-backdrop'}
            containerClassName={'modal-open'}
            onHide={this.handleHide}
            show={this.state.show}>
            <div className="modal-dialog">ddd</div>
          </Modal>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />,
  document.getElementById('app')
);
