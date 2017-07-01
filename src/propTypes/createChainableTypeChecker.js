/**
 * Create chain-able isRequired validator
 *
 * Largely copied directly from:
 * https://github.com/facebook/react/blob/master/src/isomorphic/classic/types/ReactPropTypes.js#L157
 *
 * We use an Error-like object for backward compatibility as people may call
 * PropTypes directly and inspect their output. However, we don't use real
 * Errors anymore. We don't inspect their stack anyway, and creating them
 * is prohibitively expensive if they are created too often, such as what
 * happens in oneOfType() for any type before the one that matched.
 */
function PropTypeError(message) {
  this.message = message;
  this.stack = '';
}
// Make `instanceof Error` still work for returned errors.
PropTypeError.prototype = Error.prototype;

export default function createChainableTypeChecker(validate: Function) {

  function checkType(
    isRequired,
    props,
    propName,
    componentName,
    location,
    propFullName,
    secret,
  ) {
    componentName = componentName || '<<anonymous>>';
    propFullName = propFullName || propName;
    if (props[propName] == null) { //eslint-disable-line
      if (isRequired) {
        if (props[propName] === null) {
          return new PropTypeError(
            `The ${location} \`${propFullName}\` is marked as required ` +
            `in \`${componentName}\`, but its value is \`null\`.`,
          );
        }
        return new PropTypeError(
          `The ${location} \`${propFullName}\` is marked as required in ` +
          `\`${componentName}\`, but its value is \`undefined\`.`,
        );
      }
      return null;
    } else {
      return validate(props, propName, componentName, location, propFullName);
    }
  }

  var chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}
