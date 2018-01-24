import {
  ownerDocument,
  getOffset,
  getPosition,
  scrollTop
} from 'dom-lib';

function getContainerDimensions(containerNode) {
  let width;
  let height;
  let scroll;
  if (containerNode.tagName === 'BODY') {
    width = window.innerWidth;
    height = window.innerHeight;
    scroll = scrollTop(ownerDocument(containerNode).documentElement) || scrollTop(containerNode);
  } else {
    ({ width, height } = getOffset(containerNode));
    scroll = scrollTop(containerNode);
  }
  return { width, height, scroll };
}

function getTopDelta(top, overlayHeight, container, padding) {
  const containerDimensions = getContainerDimensions(container);
  const containerScroll = containerDimensions.scroll;
  const containerHeight = containerDimensions.height;

  const topEdgeOffset = top - padding - containerScroll;
  const bottomEdgeOffset = ((top + padding) - containerScroll) + overlayHeight;

  if (topEdgeOffset < 0) {
    return -topEdgeOffset;
  } else if (bottomEdgeOffset > containerHeight) {
    return containerHeight - bottomEdgeOffset;
  }

  return 0;
}

function getLeftDelta(left, overlayWidth, container, padding) {
  const containerDimensions = getContainerDimensions(container);
  const containerWidth = containerDimensions.width;

  const leftEdgeOffset = left - padding;
  const rightEdgeOffset = left + padding + overlayWidth;

  if (leftEdgeOffset < 0) {
    return -leftEdgeOffset;
  } else if (rightEdgeOffset > containerWidth) {
    return containerWidth - rightEdgeOffset;
  }

  return 0;
}

const utils = {
  getContainerDimensions,
  getPosition(target, container) {
    const offset = container.tagName === 'BODY' ? getOffset(target) : getPosition(target, container);
    return offset;
  },

  calcOverlayPosition(placement, overlayNode, target, container, padding) {

    const childOffset = utils.getPosition(target, container);
    const { height: overlayHeight, width: overlayWidth } = getOffset(overlayNode);

    let positionLeft;
    let positionTop;
    let arrowOffsetLeft;
    let arrowOffsetTop;

    if (placement === 'left' || placement === 'right') {
      positionTop = childOffset.top + ((childOffset.height - overlayHeight) / 2);

      if (placement === 'left') {
        positionLeft = childOffset.left - overlayWidth;
      } else {
        positionLeft = childOffset.left + childOffset.width;
      }

      const topDelta = getTopDelta(positionTop, overlayHeight, container, padding);

      positionTop += topDelta;
      arrowOffsetTop = `${50 * (1 - ((2 * topDelta) / overlayHeight))}%`;
      arrowOffsetLeft = undefined;

    } else if (placement === 'top' || placement === 'bottom') {
      positionLeft = childOffset.left + ((childOffset.width - overlayWidth) / 2);

      if (placement === 'top') {
        positionTop = childOffset.top - overlayHeight;
      } else {
        positionTop = childOffset.top + childOffset.height;
      }

      const leftDelta = getLeftDelta(positionLeft, overlayWidth, container, padding);
      positionLeft += leftDelta;
      arrowOffsetLeft = `${50 * (1 - ((2 * leftDelta) / overlayWidth))}%`;
      arrowOffsetTop = undefined;
    } else if (placement === 'topLeft') {
      positionLeft = childOffset.left;
      positionTop = childOffset.top - overlayHeight;
    } else if (placement === 'topRight') {
      positionLeft = childOffset.left + (childOffset.width - overlayWidth);
      positionTop = childOffset.top - overlayHeight;
    } else if (placement === 'leftTop') {
      positionLeft = childOffset.left - overlayWidth;
      positionTop = childOffset.top + (childOffset.height - overlayHeight);
    } else if (placement === 'leftBottom') {
      positionLeft = childOffset.left - overlayWidth;
      positionTop = childOffset.top;
    } else if (placement === 'bottomLeft') {
      positionLeft = childOffset.left;
      positionTop = childOffset.top + childOffset.height;
    } else if (placement === 'bottomRight') {
      positionLeft = childOffset.left + (childOffset.width - overlayWidth);
      positionTop = childOffset.top + childOffset.height;
    } else if (placement === 'rightTop') {
      positionLeft = childOffset.left + childOffset.width;
      positionTop = childOffset.top + (childOffset.height - overlayHeight);
    } else if (placement === 'rightBottom') {
      positionLeft = childOffset.left + childOffset.width;
      positionTop = childOffset.top;
    } else {
      throw new Error(
        `calcOverlayPosition(): No such placement of "${placement}" found.`
      );
    }

    return {
      positionLeft,
      positionTop,
      arrowOffsetLeft,
      arrowOffsetTop
    };
  }
};

export default utils;
