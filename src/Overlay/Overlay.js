import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import elementType from '../propTypes/elementType';

import BaseOverlay from './BaseOverlay';
import Fade from '../Animation/Fade';



class Overlay extends React.Component {

  static propTypes = {
    ...BaseOverlay.propTypes,
    show: PropTypes.bool,
    rootClose: PropTypes.bool,
    onHide: PropTypes.func,
    animation: PropTypes.oneOfType([PropTypes.bool, elementType])
  };

  static defaultProps = {
    animation: Fade,
    rootClose: false,
    show: false
  };

  render() {
    let {
      children: child,
      animation: transition,
      ...props
    } = this.props;

    if (transition === true) {
      transition = Fade;
    }

    if (transition === false) {
      transition = null;
    }

    if (!transition) {
      child = cloneElement(child, {
        className: classNames('in', child.props.className)
      });
    }

    return (
      <BaseOverlay {...props} transition={transition}>
        {child}
      </BaseOverlay>
    );
  }
}

export default Overlay;
