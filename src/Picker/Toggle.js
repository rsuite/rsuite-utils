// @flow

import * as React from 'react';
import classNames from 'classnames';
import getUnhandledProps from '../utils/getUnhandledProps';
import { namespace } from './constants';
import prefix from '../utils/prefix';

import type { DefaultEventFunction } from '../utils/TypeDefinition';

type Props = {
  classPrefix?: string,
  hasValue?: boolean,
  cleanable?: boolean,
  className?: string,
  children?: React.Node,
  caret?: boolean,
  componentClass: React.ElementType,
  onClean?: DefaultEventFunction
};

class Toggle extends React.Component<Props> {
  static defaultProps = {
    componentClass: 'a',
    classPrefix: `${namespace}-toggle`,
    caret: true
  };

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  renderToggleClean() {
    const { onClean } = this.props;
    return (
      <span
        className={this.addPrefix('clean')}
        role="button"
        tabIndex="-1"
        onClick={e => {
          onClean && onClean();
          e.stopPropagation();
        }}
      >
        ✕
      </span>
    );
  }
  render() {
    const {
      componentClass: Component,
      children,
      className,
      hasValue,
      cleanable,
      classPrefix,
      caret,
      ...rest
    } = this.props;

    const defaultClassName = Component === 'a' ? classPrefix : this.addPrefix('custom');
    const classes = classNames(defaultClassName, className, {
      [this.addPrefix('cleanable')]: hasValue && cleanable
    });
    const unhandled = getUnhandledProps(Toggle, rest);

    return (
      <Component {...unhandled} role="button" tabIndex="-1" className={classes}>
        {hasValue ? (
          <span className={this.addPrefix('value')}>{children}</span>
        ) : (
          <span className={this.addPrefix('placeholder')}>{children}</span>
        )}
        {caret && <span className={this.addPrefix('caret')} />}
        {hasValue && cleanable && this.renderToggleClean()}
      </Component>
    );
  }
}

export default Toggle;
