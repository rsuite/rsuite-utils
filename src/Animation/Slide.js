// @flow

import * as React from 'react';
import classNames from 'classnames';
import Transition from './Transition';

type Props = {
  timeout?: number,
  in?: boolean,
  placement?: 'top' | 'right' | 'bottom' | 'left'
};

class Slide extends React.Component<Props> {
  static displayName = 'Slide';
  static defaultProps = {
    placement: 'right',
    timeout: 300
  };

  render() {
    const { timeout, placement, ...props } = this.props;
    const enteringClassName = classNames('slide-in', placement, 'animated');
    const exitingClassName = classNames('slide-out', placement, 'animated');

    return (
      <Transition
        {...props}
        animation
        timeout={timeout}
        enteringClassName={enteringClassName}
        exitingClassName={exitingClassName}
      />
    );
  }
}

export default Slide;
