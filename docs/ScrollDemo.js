import React from 'react';
import OverlayTrigger from '../src/Overlay/OverlayTrigger';

const Tooltip = ({ style, className, children, onMouseLeave, onMouseEnter }) => (
  <div
    onMouseLeave={onMouseLeave}
    onMouseEnter={onMouseEnter}
    className={className}
    style={{
      display: 'inline-block',
      position: 'absolute',
      padding: 10,
      width: 100,
      height: 100,
      background: '#fff',
      border: '1px solid #ddd',
      filter: 'drop-shadow(0 1px 8px rgba(0, 0, 0, 0.12))',
      ...style
    }}
  >
    {children ? children : 'tooltip'}
  </div>
);

const placements = [
  'left',
  'right',
  'top',
  'bottom',
  'leftStart',
  'leftEnd',
  'rightStart',
  'rightEnd',
  'topStart',
  'topEnd',
  'bottomStart',
  'bottomEnd'
];

const containerStyle = {
  position: 'relative',
  height: 200,
  width: 200,
  overflow: 'auto',
  background: '#f1f1f1',
  boxShadow: '#999 1px 1px 5px inset'
};

const contentStyle = {
  width: 500,
  height: 500,
  margin: 300,
  padding: 10,
  background: 'red'
};

class ScrollDemo extends React.Component {
  render() {
    return (
      <div className="row">
        <h3>preventOverflow</h3>
        <div
          style={containerStyle}
          ref={ref => {
            this.container = ref;
          }}
        >
          <div style={contentStyle}>
            {placements.map(item => (
              <OverlayTrigger
                key={item}
                container={() => {
                  return this.container;
                }}
                trigger="click"
                placement={item}
                speaker={<Tooltip>{item}</Tooltip>}
                preventOverflow
              >
                <button>{item}</button>
              </OverlayTrigger>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ScrollDemo;
