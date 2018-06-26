import maxBy from 'lodash/maxBy';
import minBy from 'lodash/minBy';
import capitalize from 'lodash/capitalize';
import kebabCase from 'lodash/kebabCase';

import { ownerDocument, getOffset, getPosition, scrollTop, scrollLeft } from 'dom-lib';

function getContainerDimensions(containerNode) {
  let width;
  let height;
  let scroll;
  let scrollX;
  let scrollY;
  if (containerNode.tagName === 'BODY') {
    width = window.innerWidth;
    height = window.innerHeight;
    scrollY = scrollTop(ownerDocument(containerNode).documentElement) || scrollTop(containerNode);
    scrollX = scrollLeft(ownerDocument(containerNode).documentElement) || scrollLeft(containerNode);
    scroll = scrollY;
  } else {
    ({ width, height } = getOffset(containerNode));
    scrollY = scrollTop(containerNode);
    scrollX = scrollLeft(containerNode);
    scroll = scrollY;
  }
  return { width, height, scroll, scrollX, scrollY };
}

function getTopDelta(top, overlayHeight, container, padding) {
  const containerDimensions = getContainerDimensions(container);
  const containerScroll = containerDimensions.scroll;
  const containerHeight = containerDimensions.height;

  const topEdgeOffset = top - padding - containerScroll;
  const bottomEdgeOffset = top + padding - containerScroll + overlayHeight;

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
    const offset =
      container.tagName === 'BODY' ? getOffset(target) : getPosition(target, container);
    return offset;
  },
  calcAutoPlacement(placement, targetOffset, container, overlay) {
    const { width, height, scrollX, scrollY } = getContainerDimensions(container);
    const left = targetOffset.left - scrollX - overlay.width;
    const top = targetOffset.top - scrollY - overlay.height;
    const right = width - targetOffset.left - targetOffset.width + scrollX - overlay.width;
    const bottom = height - targetOffset.top - targetOffset.height + scrollY - overlay.height;

    const horizontal = [{ key: 'left', value: left }, { key: 'right', value: right }];
    const vertical = [{ key: 'top', value: top }, { key: 'bottom', value: bottom }];
    const AV = 'autoVertical';
    const AH = 'autoHorizontal';

    let direction;
    let align;

    if (placement.indexOf(AV) !== -1) {
      direction = maxBy(vertical, o => o.value);
      return placement === AV ? direction.key : `${direction.key}${placement.replace(AV, '')}`;
    } else if (placement.indexOf(AH) !== -1) {
      direction = maxBy(horizontal, o => o.value);
      return placement === AH ? direction.key : `${direction.key}${placement.replace(AH, '')}`;
    }

    /**
     * Precedence Vertical
     * [...vertical, ...horizontal]
     */
    direction = maxBy([...vertical, ...horizontal], o => o.value);

    if (direction.key === 'left' || direction.key === 'right') {
      align = minBy(vertical, o => o.value);
    } else {
      align = minBy(horizontal, o => o.value);
    }

    return `${direction.key}${capitalize(align.key)}`;
  },
  calcOverlayPosition(placement, overlayNode, target, container, padding) {
    const childOffset = utils.getPosition(target, container);
    const { height: overlayHeight, width: overlayWidth } = getOffset(overlayNode);

    if (placement && placement.indexOf('auto') >= 0) {
      placement = this.calcAutoPlacement(placement, childOffset, container, {
        height: overlayHeight,
        width: overlayWidth
      });
    }

    let positionLeft;
    let positionTop;
    let arrowOffsetLeft;
    let arrowOffsetTop;

    if (placement === 'left' || placement === 'right') {
      positionTop = childOffset.top + (childOffset.height - overlayHeight) / 2;

      if (placement === 'left') {
        positionLeft = childOffset.left - overlayWidth;
      } else {
        positionLeft = childOffset.left + childOffset.width;
      }

      const topDelta = getTopDelta(positionTop, overlayHeight, container, padding);

      positionTop += topDelta;
      arrowOffsetTop = `${50 * (1 - (2 * topDelta) / overlayHeight)}%`;
      arrowOffsetLeft = undefined;
    } else if (placement === 'top' || placement === 'bottom') {
      positionLeft = childOffset.left + (childOffset.width - overlayWidth) / 2;

      if (placement === 'top') {
        positionTop = childOffset.top - overlayHeight;
      } else {
        positionTop = childOffset.top + childOffset.height;
      }

      const leftDelta = getLeftDelta(positionLeft, overlayWidth, container, padding);
      positionLeft += leftDelta;
      arrowOffsetLeft = `${50 * (1 - (2 * leftDelta) / overlayWidth)}%`;
      arrowOffsetTop = undefined;
    } else if (placement === 'topLeft') {
      positionLeft = childOffset.left;
      positionTop = childOffset.top - overlayHeight;
    } else if (placement === 'topRight') {
      positionLeft = childOffset.left + (childOffset.width - overlayWidth);
      positionTop = childOffset.top - overlayHeight;
    } else if (placement === 'leftTop') {
      positionLeft = childOffset.left - overlayWidth;
      positionTop = childOffset.top;
    } else if (placement === 'leftBottom') {
      positionLeft = childOffset.left - overlayWidth;
      positionTop = childOffset.top + (childOffset.height - overlayHeight);
    } else if (placement === 'bottomLeft') {
      positionLeft = childOffset.left;
      positionTop = childOffset.top + childOffset.height;
    } else if (placement === 'bottomRight') {
      positionLeft = childOffset.left + (childOffset.width - overlayWidth);
      positionTop = childOffset.top + childOffset.height;
    } else if (placement === 'rightTop') {
      positionLeft = childOffset.left + childOffset.width;
      positionTop = childOffset.top;
    } else if (placement === 'rightBottom') {
      positionLeft = childOffset.left + childOffset.width;
      positionTop = childOffset.top + (childOffset.height - overlayHeight);
    } else {
      throw new Error(`calcOverlayPosition(): No such placement of "${placement}" found.`);
    }

    return {
      positionLeft,
      positionTop,
      arrowOffsetLeft,
      arrowOffsetTop,
      positionClassName: `placement-${kebabCase(placement)}`
    };
  }
};

export default utils;
