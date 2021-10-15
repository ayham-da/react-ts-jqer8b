import { FrogPlugin, Position } from '../use-frog/types';

export const limitPlugin = <T extends Position = Position>(
  maxX: number,
  maxY: number
): FrogPlugin<T> => ({
  reducer: (state) => {
    const limitedPosition = {
      ...state,
      x: Math.max(0, Math.min(maxX, state.x)),
      y: Math.max(0, Math.min(maxY, state.y)),
    };
    if (JSON.stringify(limitedPosition) !== JSON.stringify(state)) {
      return limitedPosition;
    }
    return state;
  },
});
