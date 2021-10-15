import { JumpFrogState } from './jump-plugin';
import { FrogPlugin } from '../use-frog/types';

export const mazePlugin = (maze: number[][]): FrogPlugin<JumpFrogState> => ({
  reducer: (newState, action, oldState) => {
    const mazeZ = maze?.[newState.y]?.[newState.x];
    if (mazeZ > (newState.z || 0)) {
      return {
        ...newState,
        x: oldState.x,
        y: oldState.y,
        z: oldState.z,
      };
    }
    return newState;
  },
});
