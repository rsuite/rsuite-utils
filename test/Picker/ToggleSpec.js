import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { findDOMNode } from 'react-dom';

import Toggle from '../../src/Picker/Toggle';
import { namespace } from '../../src/Picker/constants';

const cleanClassName = `.${namespace}-toggle-clean`;

describe('Toggle', () => {
  it('Should output a toggle', () => {
    const Title = 'Title';
    const instance = ReactTestUtils.renderIntoDocument(
      <Toggle title="title" >
        {Title}
      </Toggle>
    );

    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.tagName, 'A');
    assert.ok(instanceDom.className.match(/\btoggle\b/));
    assert.equal(instanceDom.innerText, Title);
  });

  it('Should call `onClean` callback', (done) => {
    const doneOp = () => {
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <Toggle title="title" value="title" cleanable onClean={doneOp}>
        Title
      </Toggle>
    );
    const instanceDOM = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDOM.querySelector(cleanClassName));
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Toggle className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(
      <Toggle style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

});
