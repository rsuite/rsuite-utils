import React from 'react';
import createChainableTypeChecker from './createChainableTypeChecker';

/**
 * Checks whether a prop provides a type of element.
 *
 * The type of element can be provided in two forms:
 * - tag name (string)
 * - a return value of React.createClass(...)
 *
 * @param props
 * @param propName
 * @param componentName
 * @returns {Error|undefined}
 */

function elementType(props: Object, propName: String, componentName: String, location: String, propFullName: String) {
  const propValue = props[propName];
  const propType = typeof propValue;

  if (React.isValidElement(propValue)) {
    return new Error(
      `Invalid ${location} \`${propFullName}\` of type ReactElement ` +
      `supplied to \`${componentName}\`, expected an element type (a string ` +
      'or a ReactClass).'
    );
  }

  if (propType !== 'function' && propType !== 'string') {
    return new Error(
      `Invalid ${location} \`${propFullName}\` of value \`${propValue}\` ` +
      `supplied to \`${componentName}\`, expected an element type (a string ` +
      'or a ReactClass).'
    );
  }

  return null;
}

export default createChainableTypeChecker(elementType);
