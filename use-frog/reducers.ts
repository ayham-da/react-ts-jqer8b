import { ActionType, Position } from './types';

export const Actions = {
  forward: 'forward',
  left: 'left',
  right: 'right',
  backward: 'backward',
  init: 'init',
};

export const defaultReducer = <T extends Position = Position>(
  state: T,
  action: ActionType
): T => {
  switch (action.type) {
    case Actions.forward:
      return {
        ...state,
        y: state.y + 1,
      };
    case Actions.backward:
      return {
        ...state,
        y: state.y - 1,
      };
    case Actions.left:
      return {
        ...state,
        x: state.x - 1,
      };
    case Actions.right:
      return {
        ...state,
        x: state.x + 1,
      };
    default:
      return state;
  }
};
