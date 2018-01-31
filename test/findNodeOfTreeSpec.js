import filterNodesOfTree from '../src/utils/filterNodesOfTree';

describe('filterNodesOfTree', () => {

  it('Should have 2 children', () => {

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

    const nodes = filterNodesOfTree(items, item => item.value.indexOf('abcd') >= 0);

    assert.equal(nodes.length, 2);
    assert.equal(nodes[0].value, 'abcd');
    assert.equal(nodes[1].children.length, 1);
    assert.equal(nodes[1].children[0].value, 'vv-abcd');
  });


  it('Should have a child', () => {

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

    const nodes = filterNodesOfTree(items, item => item.value.indexOf('vvv') >= 0);

    assert.equal(nodes.length, 1);
    assert.equal(nodes[0].value, 'vvv');
    assert.equal(nodes[0].children.length, 2);
    assert.equal(nodes[0].children[1].value, 'vv-abcd');
  });

});
