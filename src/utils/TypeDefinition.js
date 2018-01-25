export type Dimension = 'height' | 'width';
export type PlacementAround = 'top' | 'right' | 'bottom' | 'left';
export type PlacementEighPoints = 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight' | 'leftTop' | 'rightTop' | 'leftBottom' | 'rightBottom';
export type Placement = PlacementAround | PlacementEighPoints;
export type TriggerName = 'click' | 'hover' | 'focus';

export type DefaultEvent = SyntheticEvent<*>;
export type ReactFindDOMNode = null | Element | Text;
export type DefaultEventFunction = (event: DefaultEvent) => void;
export type AnimationEventFunction = (node: ReactFindDOMNode) => void;


export type AnimationEventProps = {
  onEnter: AnimationEventFunction,
  onEntering: AnimationEventFunction,
  onEntered: AnimationEventFunction,
  onExit: AnimationEventFunction,
  onExiting: AnimationEventFunction,
  onExited: AnimationEventFunction
};

export type AnimationClassNameProps = {
  exitedClassName?: string,
  exitingClassName?: string,
  enteredClassName?: string,
  enteringClassName?: string
}
