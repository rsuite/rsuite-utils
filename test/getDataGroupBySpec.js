import getDataGroupBy from '../src/utils/getDataGroupBy';
import _ from 'lodash';

describe('getDataGroupBy', () => {

  it('getDataGroupBy', () => {

    const items = [{
      value: 'abc',
      group: 'title'
    }, {
      value: 'abcd',
      group: 'title'
    }];

    const groups = getDataGroupBy(items, 'group');

    assert.ok(
      _.isEqual(groups, [{
        groupTitle: 'title',
        children: [{ value: 'abc' }, { value: 'abcd' }]
      }])
    );

  });

});
