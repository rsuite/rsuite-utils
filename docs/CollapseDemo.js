import React from 'react';
import Collapse from '../src/Animation/Collapse';

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

class CollapseDemo extends React.Component {
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
        <h2>Collapse</h2>
        <button onClick={this.handleToggle}>toggle</button>
        <Collapse
          in={this.state.show}

        >
          <Panel />
        </Collapse>
      </div>

    );
  }
}

export default CollapseDemo;
