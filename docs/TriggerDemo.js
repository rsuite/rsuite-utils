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

const Dropdown = ({ placement }) => (
  <OverlayTrigger placement={placement} speaker={<Tooltip>{placement}</Tooltip>}>
    <button>{placement}</button>
  </OverlayTrigger>
);

let positionNode;

class TriggerDemo extends React.Component {
  render() {
    return (
      <div className="row">
        <h2>OverlayTrigger</h2>
        <h3> 4 placement </h3>
        <div>
          <OverlayTrigger
            trigger="click"
            placement="left"
            speaker={<Tooltip />}
            open
            positionRef={ref => {
              positionNode = ref;
            }}
          >
            <button>updatePosition</button>
          </OverlayTrigger>
          <button
            onClick={() => {
              console.log(positionNode, positionNode.updatePosition(true));
            }}
          >
            Update
          </button>
        </div>
        <div>
          <OverlayTrigger
            trigger="click"
            placement="top"
            speaker={<Tooltip />}
            onHide={() => {
              console.log('hide');
            }}
          >
            <button>Top</button>
          </OverlayTrigger>
          <OverlayTrigger trigger="click" placement="bottom" speaker={<Tooltip />}>
            <button>Bottom</button>
          </OverlayTrigger>
          <OverlayTrigger trigger="click" placement="left" speaker={<Tooltip />}>
            <button>Left</button>
          </OverlayTrigger>
          <OverlayTrigger trigger="click" placement="right" speaker={<Tooltip />}>
            <button>Right</button>
          </OverlayTrigger>
        </div>
        <hr />
        <h3> 8 placement </h3>
        <table>
          <tbody>
            <tr>
              <td />
              <td>
                <Dropdown placement="topLeft" />
              </td>
              <td>
                <Dropdown placement="topRight" />
              </td>
              <td />
            </tr>
            <tr>
              <td>
                <Dropdown placement="leftTop" />
              </td>
              <td />
              <td />
              <td>
                <Dropdown placement="rightTop" />
              </td>
            </tr>
            <tr>
              <td>
                <Dropdown placement="leftBottom" />
              </td>
              <td />
              <td />
              <td>
                <Dropdown placement="rightBottom" />
              </td>
            </tr>
            <tr>
              <td />
              <td>
                <Dropdown placement="bottomLeft" />
              </td>
              <td>
                <Dropdown placement="bottomRight" />
              </td>
              <td />
            </tr>
          </tbody>
        </table>
        <hr />
        <h3>placement='auto'</h3>
        <div
          style={{
            position: 'relative',
            height: 200,
            width: 100,
            overflow: 'auto',
            background: '#f1f1f1',
            boxShadow: '#999 1px 1px 5px inset',
            padding: 150
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
              placement="auto"
              speaker={<Tooltip />}
            >
              <button>auto-100*100</button>
            </OverlayTrigger>
            <br />
            <OverlayTrigger
              container={() => {
                return this.container;
              }}
              trigger="click"
              placement="auto"
              speaker={
                <Tooltip
                  style={{
                    width: 200,
                    height: 50
                  }}
                />
              }
            >
              <button>auto-200*50</button>
            </OverlayTrigger>
            <br />
            <OverlayTrigger
              container={() => {
                return this.container;
              }}
              trigger="click"
              placement="auto"
              speaker={
                <Tooltip
                  style={{
                    width: 100,
                    height: 200
                  }}
                />
              }
            >
              <button>auto-100*200</button>
            </OverlayTrigger>

            <br />
            <OverlayTrigger
              container={() => {
                return this.container;
              }}
              trigger="click"
              placement="autoVertical"
              speaker={
                <Tooltip
                  style={{
                    width: 100,
                    height: 100
                  }}
                />
              }
            >
              <button>autoVertical</button>
            </OverlayTrigger>
            <br />
            <OverlayTrigger
              container={() => {
                return this.container;
              }}
              trigger="click"
              placement="autoVerticalLeft"
              speaker={
                <Tooltip
                  style={{
                    width: 100,
                    height: 100
                  }}
                />
              }
            >
              <button>autoVerticalLeft</button>
            </OverlayTrigger>

            <br />
            <OverlayTrigger
              container={() => {
                return this.container;
              }}
              trigger="click"
              placement="autoVerticalRight"
              speaker={
                <Tooltip
                  style={{
                    width: 100,
                    height: 100
                  }}
                />
              }
            >
              <button>autoVerticalRight</button>
            </OverlayTrigger>

            <br />
            <OverlayTrigger
              container={() => {
                return this.container;
              }}
              trigger="click"
              placement="autoHorizontal"
              speaker={
                <Tooltip
                  style={{
                    width: 100,
                    height: 100
                  }}
                />
              }
            >
              <button>autoHorizontal</button>
            </OverlayTrigger>

            <br />
            <OverlayTrigger
              container={() => {
                return this.container;
              }}
              trigger="click"
              placement="autoHorizontalTop"
              speaker={
                <Tooltip
                  style={{
                    width: 100,
                    height: 100
                  }}
                />
              }
            >
              <button>autoHorizontalTop</button>
            </OverlayTrigger>

            <br />
            <OverlayTrigger
              container={() => {
                return this.container;
              }}
              trigger="click"
              placement="autoHorizontalBottom"
              speaker={
                <Tooltip
                  style={{
                    width: 100,
                    height: 100
                  }}
                />
              }
            >
              <button>autoHorizontalBottom</button>
            </OverlayTrigger>
          </div>
        </div>

        <hr />
        <h3>Trigger</h3>

        <OverlayTrigger trigger="click" speaker={<Tooltip>click</Tooltip>}>
          <button>click</button>
        </OverlayTrigger>

        <OverlayTrigger trigger="focus" speaker={<Tooltip>focus</Tooltip>}>
          <input />
        </OverlayTrigger>

        <OverlayTrigger trigger="hover" speaker={<Tooltip>hover</Tooltip>}>
          <button>hover</button>
        </OverlayTrigger>

        <OverlayTrigger trigger="active" speaker={<Tooltip>active</Tooltip>}>
          <div>
            <button>active</button>
            <p>active test</p>
          </div>
        </OverlayTrigger>

        <hr />
        <h3>defaultOpen</h3>

        <OverlayTrigger trigger="click" speaker={<Tooltip />} placement="rightBottom" defaultOpen>
          <button>defaultOpen</button>
        </OverlayTrigger>
        <hr />
        <h3>open</h3>

        <OverlayTrigger trigger="click" placement="rightBottom" speaker={<Tooltip />} open>
          <button>open</button>
        </OverlayTrigger>
      </div>
    );
  }
}

export default TriggerDemo;
