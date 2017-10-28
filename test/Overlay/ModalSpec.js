import React from 'react';
import { render } from 'react-dom';

import { Modal } from '../../src/Overlay';

describe('<Modal>', () => {
  let mountPoint;

  beforeEach(() => {
    mountPoint = document.createElement('div');
    document.body.appendChild(mountPoint);
  });

  it('Should render the modal content', () => {
    let instance = render(<Modal show ><p>message</p></Modal>, mountPoint);
    console.log(instance.modal);
    assert.equal(instance.modal.querySelectorAll('p').length, 1);
  });

});
