import React from 'react';
import OverlayTrigger from '../src/Overlay/OverlayTrigger';

const Tooltip = ({ style, children, onMouseLeave, onMouseEnter }) => (
  <div
    onMouseLeave={onMouseLeave}
    onMouseEnter={onMouseEnter}
    style={{
      display: 'inline-block',
      position: 'absolute',
      padding: 10,
      width: 120,
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

class TriggerDemo extends React.Component {
  render() {
    return (
      <div className="row">
        <h2>OverlayTrigger</h2>
        <h3> 4 placement </h3>
        <div>
          <OverlayTrigger trigger="click" placement="top" speaker={<Tooltip />}>
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

        <h3>Trigger</h3>

        <OverlayTrigger trigger="click" speaker={<Tooltip />}>
          <button>click</button>
        </OverlayTrigger>

        <OverlayTrigger trigger="focus" speaker={<Tooltip />}>
          <input value="focus" />
        </OverlayTrigger>

        <OverlayTrigger trigger="hover" speaker={<Tooltip />}>
          <button>hover</button>
        </OverlayTrigger>

        <h3>defaultOpen</h3>

        <OverlayTrigger trigger="click" speaker={<Tooltip />} placement="rightBottom" defaultOpen>
          <button>defaultOpen</button>
        </OverlayTrigger>

        <h3>open</h3>

        <OverlayTrigger trigger="click" placement="rightBottom" speaker={<Tooltip />} open>
          <button>open</button>
        </OverlayTrigger>
      </div>
    );
  }
}

export default TriggerDemo;
