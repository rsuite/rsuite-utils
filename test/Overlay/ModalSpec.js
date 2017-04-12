import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import { Modal } from '../../src/Overlay';

describe('Modal', () => {


  it('Should output a modal', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Modal show><div >---</div></Modal>
    );

    console.error(instance, '----');
    assert.ok("DIV", 'DIV');
  });

});
