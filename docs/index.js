import React from 'react';
import ReactDOM from 'react-dom';
import ModalDemo from './ModalDemo';
import TriggerDemo from './TriggerDemo';
import CollapseDemo from './CollapseDemo';
import FadeDemo from './FadeDemo';
import BounceDemo from './BounceDemo';
import SlideDemo from './SlideDemo';
import NestedAnimationDemo from './NestedAnimationDemo';
import ClipboardDemo from './ClipboardDemo';
import ScrollDemo from './ScrollDemo';

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
          <ScrollDemo />
          <hr />
          <CollapseDemo />
          <hr />
          <FadeDemo />
          <hr />
          <BounceDemo />
          <hr />
          <SlideDemo />
          <hr />
          <NestedAnimationDemo />
          <hr />
          <ClipboardDemo />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
