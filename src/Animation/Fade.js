import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Transition from './Transition';


class Fade extends React.Component {

  static displayName = 'Fade';
  static propTypes = {

    in: PropTypes.bool,
    unmountOnExit: PropTypes.bool,
    transitionAppear: PropTypes.bool,
    timeout: PropTypes.number,
    onEnter: PropTypes.func,
    onEntering: PropTypes.func,
    onEntered: PropTypes.func,
    onExit: PropTypes.func,
    onExiting: PropTypes.func,
    onExited: PropTypes.func
  };

  static defaultProps = {
    timeout: 300
  };

  render() {
    const { timeout, className, ...props } = this.props;
    return (
      <Transition
        {...props}
        timeout={timeout}
        className={classNames(className, 'fade')}
        enteredClassName="in"
        enteringClassName="in"
      />
    );
  }
}

export default Fade;
