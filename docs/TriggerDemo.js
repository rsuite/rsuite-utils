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
            placement="top"
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
              console.log(positionNode, positionNode.updatePosition());
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
                <Dropdown placement="topStart" />
              </td>
              <td>
                <Dropdown placement="topEnd" />
              </td>
              <td />
            </tr>
            <tr>
              <td>
                <Dropdown placement="leftStart" />
              </td>
              <td />
              <td />
              <td>
                <Dropdown placement="rightStart" />
              </td>
            </tr>
            <tr>
              <td>
                <Dropdown placement="leftEnd" />
              </td>
              <td />
              <td />
              <td>
                <Dropdown placement="rightEnd" />
              </td>
            </tr>
            <tr>
              <td />
              <td>
                <Dropdown placement="bottomStart" />
              </td>
              <td>
                <Dropdown placement="bottomEnd" />
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
              placement="autoVerticalStart"
              speaker={
                <Tooltip
                  style={{
                    width: 100,
                    height: 100
                  }}
                />
              }
            >
              <button>autoVerticalStart</button>
            </OverlayTrigger>

            <br />
            <OverlayTrigger
              container={() => {
                return this.container;
              }}
              trigger="click"
              placement="autoVerticalEnd"
              speaker={
                <Tooltip
                  style={{
                    width: 100,
                    height: 100
                  }}
                />
              }
            >
              <button>autoVerticalEnd</button>
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
              placement="autoHorizontalStart"
              speaker={
                <Tooltip
                  style={{
                    width: 100,
                    height: 100
                  }}
                />
              }
            >
              <button>autoHorizontalStart</button>
            </OverlayTrigger>

            <br />
            <OverlayTrigger
              container={() => {
                return this.container;
              }}
              trigger="click"
              placement="autoHorizontalEnd"
              speaker={
                <Tooltip
                  style={{
                    width: 100,
                    height: 100
                  }}
                />
              }
            >
              <button>autoHorizontalEnd</button>
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

        <OverlayTrigger trigger="click" speaker={<Tooltip />} placement="rightStart" defaultOpen>
          <button>defaultOpen</button>
        </OverlayTrigger>
        <hr />
        <h3>open</h3>

        <OverlayTrigger trigger="click" placement="right" speaker={<Tooltip />} open>
          <button>open</button>
        </OverlayTrigger>
      </div>
    );
  }
}

export default TriggerDemo;
