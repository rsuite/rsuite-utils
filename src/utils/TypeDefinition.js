export type Dimension = 'height' | 'width';
export type PlacementAround = 'top' | 'right' | 'bottom' | 'left';
export type PlacementEighPoints =
  | 'bottomLeft'
  | 'bottomRight'
  | 'topLeft'
  | 'topRight'
  | 'leftTop'
  | 'rightTop'
  | 'leftBottom'
  | 'rightBottom';
export type Placement = PlacementAround | PlacementEighPoints | 'auto';
export type TriggerName = 'click' | 'hover' | 'focus';

export type DefaultEvent = SyntheticEvent<*>;
export type ReactFindDOMNode = null | Element | Text;
export type DefaultEventFunction = (event: DefaultEvent) => void;
export type AnimationEventFunction = (node: ReactFindDOMNode) => void;
