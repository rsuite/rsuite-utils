/**
 * @example
 * underscoreName('getList');
 * => get_list
 */
export function underscore(string) {
    return string.replace(/([A-Z])/g, '_$1').toLowerCase();
}


/**
 * @example
 * camelize('font-size');
 * => fontSize
 */
export function camelize(string) {
    return string.replace(/\-(\w)/g, function (char) {
        return char.slice(1).toUpperCase();
    });
}

/**
 * @example
 * camelize('fontSize');
 * => font-size
 */
export function hyphenate(string) {
  return string.replace(/([A-Z])/g, '-$1').toLowerCase();
}




export default {
    underscore,
    hyphenate
    camelize
};
