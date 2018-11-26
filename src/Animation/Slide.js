// @flow

import * as React from 'react';
import Transition from './Transition';

type Props = {
  timeout?: number,
  in?: boolean
};

class Slide extends React.Component<Props> {
  static displayName = 'Slide';
  static defaultProps = {
    timeout: 300
  };

  render() {
    const { timeout, ...props } = this.props;
    return (
      <Transition
        {...props}
        animation
        timeout={timeout}
        enteringClassName="slide-in animated"
        exitingClassName="slide-out animated"
      />
    );
  }
}

export default Slide;
