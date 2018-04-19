import _ from 'lodash';

export default function filterNodesOfTree(data, check) {
  const findNodes = (nodes = []) =>
    nodes.filter(item => {
      if (_.isArray(item.children)) {
        const nextChildren = findNodes(item.children);
        if (nextChildren.length) {
          item.children = nextChildren;
          return true;
        }
      }
      return check(item);
    });
  return findNodes(_.cloneDeep(data));
}
