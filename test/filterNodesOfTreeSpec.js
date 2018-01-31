import findNodeOfTree from '../src/utils/findNodeOfTree';

describe('findNodeOfTree', () => {

  it('Should find the valid node', () => {

    const items = [{
      value: 'abc'
    }, {
      value: 'abcd'
    }, {
      value: 'vvv',
      children: [{
        value: 'vv-abc'
      }, {
        value: 'vv-abcd'
      }]
    }];

    const node = findNodeOfTree(items, item => item.value === 'abcd');
    const node2 = findNodeOfTree(items, item => item.value === 'vv-abcd');
    const node3 = findNodeOfTree(items, item => item.value === 'vvv');
    const node4 = findNodeOfTree(items, item => item.value === 'bbbb');

    assert.equal(node.value, 'abcd');
    assert.equal(node2.value, 'vv-abcd');
    assert.equal(node3.value, 'vvv');
    assert.equal(node4, undefined);
  });


});
