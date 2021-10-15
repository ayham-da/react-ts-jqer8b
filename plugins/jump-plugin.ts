import { ActionType, FrogPlugin, MoveApi, Position } from '../use-frog/types';

export type JumpFrogState = Position & {
  z?: number;
};

export type JumpApi = MoveApi & {
  jump: () => void;
  fall: () => void;
};

export const jumpPlugin: FrogPlugin<JumpFrogState, JumpApi> = {
  reducer: (state: JumpFrogState, action: ActionType): JumpFrogState => {
    switch (action.type) {
      case 'jump':
        return {
          ...state,
          z: (state.z || 0) + 1,
        };
      case 'high-jump':
        return {
          ...state,
          z: (state.z || 0) + 3,
        };
      case 'fall':
        return {
          ...state,
          z: (state.z || 0) - 1,
        };
      default:
        return state;
    }
  },
  getActions: (dispatch) => ({
    forward: () => {
      dispatch({ type: 'jump' });
      dispatch({ type: 'forward' });
    },
    left: () => {
      dispatch({ type: 'jump' });
      dispatch({ type: 'left' });
    },
    right: () => {
      dispatch({ type: 'jump' });
      dispatch({ type: 'right' });
    },
    backward: () => {
      dispatch({ type: 'jump' });
      dispatch({ type: 'backward' });
    },
    jump: () => dispatch({ type: 'high-jump' }),
    fall: () => dispatch({ type: 'fall' }),
  }),
  effect: ({ fall }, { z }) => {
    if ((z || 0) > 0) {
      fall();
    }
  },
};
