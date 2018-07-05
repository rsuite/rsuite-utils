import React from 'react';
import copyToClipboard from '../src/utils/copyToClipboard';


class ClipboardDemo extends React.Component {
  constructor(props) {
    super(props);
    this.handleCopy = this.handleCopy.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      text: 'rsuite-utils'
    };
  }

  handleCopy() {
    const succeeded = copyToClipboard(this.state.text);
    alert(`Copy ${succeeded ? 'succeeded' : 'failed'}.`);
  }

  handleInputChange(e) {
    this.setState({
      text: e.target.value
    });
  }

  render() {
    return (
      <div className="row">
        <h2>CopyToClipboard</h2>
        <input value={this.state.text} onChange={this.handleInputChange} />
        <button onClick={this.handleCopy}>Copy</button>
      </div>
    );
  }
}

export default ClipboardDemo;
