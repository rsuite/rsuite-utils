import React from 'react';
import Fade from '../src/Animation/Fade';

const Panel = ({ ...props }) => (
  <div
    {...props}
    style={{
      background: '#000',
      width: 100,
      overflow: 'hidden'
    }}
  >
    <p>Panel</p>
    <p>Content Content Content</p>
  </div>
);

class FadeDemo extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.state = {
      show: true
    };
  }

  handleToggle() {
    this.setState({
      show: !this.state.show
    });
  }

  render() {
    return (
      <div className="row" style={{ height: 200 }}>
        <h2>Fade</h2>
        <button onClick={this.handleToggle}>toggle</button>
        <Fade in={this.state.show}>
          <Panel />
        </Fade>
      </div>
    );
  }
}

export default FadeDemo;
