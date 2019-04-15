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
      width: 120,
      height: 120,
      background: '#fff',
      border: '1px solid #ddd',
      filter: 'drop-shadow(0 1px 8px rgba(0, 0, 0, 0.12))',
      ...style
    }}
  >
    {children ? children : 'tooltip'}
  </div>
);

class ScrollDemo extends React.Component {
  render() {
    return (
      <div className="row">
        <div
          style={{
            position: 'relative',
            height: 200,
            width: 100,
            overflow: 'auto',
            background: '#f1f1f1',
            boxShadow: '#999 1px 1px 5px inset',
            padding: 110
          }}
          ref={ref => {
            this.container = ref;
          }}
        >
          <div
            style={{
              height: 500,
              width: 500
            }}
          >
            <OverlayTrigger
              container={() => {
                return this.container;
              }}
              trigger="click"
              placement="left"
              speaker={<Tooltip />}
            >
              <button>left</button>
            </OverlayTrigger>
            <OverlayTrigger
              container={() => {
                return this.container;
              }}
              trigger="click"
              placement="right"
              speaker={<Tooltip />}
            >
              <button>right</button>
            </OverlayTrigger>

            <OverlayTrigger
              container={() => {
                return this.container;
              }}
              trigger="click"
              placement="top"
              speaker={<Tooltip />}
            >
              <button>top</button>
            </OverlayTrigger>

            <OverlayTrigger
              container={() => {
                return this.container;
              }}
              trigger="click"
              placement="bottom"
              speaker={<Tooltip />}
            >
              <button>bottom</button>
            </OverlayTrigger>
            <hr />

            <OverlayTrigger
              container={() => {
                return this.container;
              }}
              trigger="click"
              placement="topStart"
              speaker={<Tooltip />}
            >
              <button>topStart</button>
            </OverlayTrigger>

            <OverlayTrigger
              container={() => {
                return this.container;
              }}
              trigger="click"
              placement="topEnd"
              speaker={<Tooltip />}
            >
              <button>topEnd</button>
            </OverlayTrigger>

            <OverlayTrigger
              container={() => {
                return this.container;
              }}
              trigger="click"
              placement="leftStart"
              speaker={<Tooltip />}
            >
              <button>leftStart</button>
            </OverlayTrigger>

            <OverlayTrigger
              container={() => {
                return this.container;
              }}
              trigger="click"
              placement="leftEnd"
              speaker={<Tooltip />}
            >
              <button>leftEnd</button>
            </OverlayTrigger>

            <hr />

            <OverlayTrigger
              container={() => {
                return this.container;
              }}
              trigger="click"
              placement="bottomStart"
              speaker={<Tooltip />}
            >
              <button>bottomStart</button>
            </OverlayTrigger>

            <OverlayTrigger
              container={() => {
                return this.container;
              }}
              trigger="click"
              placement="bottomEnd"
              speaker={<Tooltip />}
            >
              <button>bottomEnd</button>
            </OverlayTrigger>

            <hr />
            <OverlayTrigger
              container={() => {
                return this.container;
              }}
              trigger="click"
              placement="rightStart"
              speaker={<Tooltip />}
            >
              <button>rightStart</button>
            </OverlayTrigger>

            <OverlayTrigger
              container={() => {
                return this.container;
              }}
              trigger="click"
              placement="rightEnd"
              speaker={<Tooltip />}
            >
              <button>rightEnd</button>
            </OverlayTrigger>
          </div>
        </div>
      </div>
    );
  }
}

export default ScrollDemo;
