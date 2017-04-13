import React from 'react';
import ReactDOM, { render, findDOMNode } from 'react-dom';
import jQuery from 'jquery';
import ReactTestUtils from 'react-dom/test-utils';
import { Modal } from '../../src/Overlay';
const $ = componentOrNode => jQuery(findDOMNode(componentOrNode));

describe('<Modal>', () => {
  let mountPoint;

  beforeEach(() => {
    mountPoint = document.createElement('div');
    document.body.appendChild(mountPoint);
  });

  it('Should render the modal content', () => {
    let instance = render(<Modal show ><p>message</p></Modal>, mountPoint);
    assert.equal(instance.modal.querySelectorAll('p').length, 1);
  });

});
