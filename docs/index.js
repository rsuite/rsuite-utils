import React from 'react';
import ReactDOM from 'react-dom';
import ModalDemo from './ModalDemo';
import TriggerDemo from './TriggerDemo';
import CollapseDemo from './CollapseDemo';
import FadeDemo from './FadeDemo';
import ClipboardDemo from './ClipboardDemo';

import './less/index.less';

class App extends React.Component {

  render() {
    return (
      <div className="doc-page">
        <div className="container">
          <h1>RSuite Utils</h1>
          <ModalDemo />
          <hr />
          <TriggerDemo />
          <hr />
          <CollapseDemo />
          <hr />
          <FadeDemo />
          <hr />
          <ClipboardDemo />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />,
  document.getElementById('app')
);
