export default function deprecated(propType: Function, explanation: String) {
  return function validate(
    props, propName, componentName,
    ...args
  ) {
    if (props[propName] !== null) {
      new Error(`"${propName}" property of "${componentName}" has been deprecated.\n${explanation}`);
    }

    return propType(props, propName, componentName, ...args);
  };
}
