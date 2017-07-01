import React from 'react';
import ReactDOM from 'react-dom';
import ModalDemo from './ModalDemo';

import './less/index.less';

class App extends React.Component {

  render() {
    return (
      <div className="doc-page">
        <div className="container">
          <h1>RSuite Utils</h1>
          <ModalDemo />

        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />,
  document.getElementById('app')
);
