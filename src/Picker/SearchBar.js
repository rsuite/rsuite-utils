// @flow

import * as React from 'react';
import classNames from 'classnames';
import getUnhandledProps from '../utils/getUnhandledProps';
import { namespace } from './constants';
import prefix from '../utils/prefix';

import type { DefaultEvent } from '../utils/TypeDefinition';

type Props = {
  classPrifix?: string,
  value?: string,
  placeholder?: string,
  className?: string,
  children?: React.Node,
  onChange?: (value: string, event: DefaultEvent) => void
}

class SearchBar extends React.Component<Props> {

  static defaultProps = {
    classPrifix: `${namespace}-search-bar`
  }

  handleChange = (event: DefaultEvent) => {
    const { onChange } = this.props;
    onChange && onChange(event.target.value, event);
  }

  render() {
    const {
      value,
      children,
      className,
      classPrifix,
      placeholder,
      ...rest
    } = this.props;

    const addPrefix = prefix(classPrifix);
    const unhandled = getUnhandledProps(SearchBar, rest);

    return (
      <div
        {...unhandled}
        className={classNames(classPrifix, className)}
      >
        <input
          className={addPrefix('input')}
          value={value}
          onChange={this.handleChange}
          placeholder={placeholder}
        />
        {children}
      </div>
    );
  }
}

export default SearchBar;
