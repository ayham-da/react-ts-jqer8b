import { Actions } from './reducers';
import { DispatchType, FrogPlugin, MoveApi, Position } from './types';

export const createFrogApi = <T extends Position, Api extends MoveApi>(
  dispatch: DispatchType,
  plugins: FrogPlugin<T, Api>[]
): Api => {
  const api = {
    forward: () => dispatch({ type: Actions.forward }),
    left: () => dispatch({ type: Actions.left }),
    right: () => dispatch({ type: Actions.right }),
    backward: () => dispatch({ type: Actions.backward }),
  } as Api;

  return plugins.reduce(
    (actions, plugin) =>
      plugin.getActions
        ? {
            ...actions,
            ...plugin.getActions(dispatch),
          }
        : actions,
    api
  );
};
