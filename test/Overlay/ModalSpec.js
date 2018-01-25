import React from 'react';
import { render } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import { Modal } from '../../src/Overlay';

describe('<Modal>', () => {
  let mountPoint;

  beforeEach(() => {
    mountPoint = document.createElement('div');
    document.body.appendChild(mountPoint);
  });

  it('Should render the modal content', () => {
    let instance = render(<Modal show><p>message</p></Modal>, mountPoint);
    assert.equal(instance.modalNode.querySelectorAll('p').length, 1);
  });

  it('Should render a backdrop', () => {
    let instance = render(<Modal show ><p>message</p></Modal>, mountPoint);
    assert.ok(instance.backdrop);
  });

  it('Should not be rendered backdrop', () => {
    let instance = render(<Modal show backdrop={false}><p>message</p></Modal>, mountPoint);
    assert.ok(!instance.backdrop);
  });

  it('Should close the modal when the backdrop is clicked', (done) => {
    let doneOp = () => {
      done();
    };
    let instance = render(
      <Modal show onHide={doneOp}>
        <strong>Message</strong>
      </Modal>
      , mountPoint);

    let backdrop = instance.backdrop;

    ReactTestUtils.Simulate.click(backdrop);
  });

});
