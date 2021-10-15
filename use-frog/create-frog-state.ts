import { useCallback } from 'react';
import { useMyReducer, UseReducerResultType } from '../use-my-reducer';
import { ActionType, FrogPlugin, ReducerType } from './types';

export const useCreateFrogState = <T, Api>(
  initialState: T,
  rootReducer: ReducerType<T>,
  plugins: FrogPlugin<T, Api>[]
): UseReducerResultType<T, ActionType> => {
  const reducer = useCallback(
    (state: T, action: ActionType): T => {
      const result = rootReducer(state, action);

      return plugins.reduce(
        (newState, { reducer: pluginReducer }): T =>
          pluginReducer ? pluginReducer(newState, action, state) : newState,
        result
      );
    },
    [rootReducer, plugins]
  );

  return useMyReducer<T, ActionType>(reducer, initialState);
};
