import React from 'react';
import reactToString from '../src/utils/reactToString';

describe('reactToString', () => {

  it('reactToString', () => {
    const str = reactToString(<div><a>123</a><span>456</span></div>);
    assert.equal(str.join(''), '123456');
  });

});
