import { useMemo } from 'react';
import { defaultReducer } from './reducers';
import {
  FrogPlugin,
  MoveApi,
  Position,
  UseFrogConfiguration,
  UseFrogResult,
} from './types';
import { useCreateFrogState } from './create-frog-state';
import { useEffects } from './use-effects';
import { createFrogApi } from './create-frog-api';

const useFrog = <T extends Position = Position, Api extends MoveApi = MoveApi>(
  configuration: UseFrogConfiguration<T>,
  plugins: FrogPlugin<T, Api>[]
): UseFrogResult<T, Api> => {
  const rootReducer = useMemo(
    () => configuration?.reducer || defaultReducer,
    [configuration?.reducer]
  );
  const { state, dispatch } = useCreateFrogState<T, Api>(
    configuration.initialState,
    rootReducer,
    plugins
  );
  const api = useMemo(
    () => createFrogApi(dispatch, plugins),
    [dispatch, plugins]
  );
  useEffects(state, api, plugins, 60);

  return {
    api,
    state,
  } as const;
};

export { useFrog, UseFrogConfiguration, FrogPlugin, MoveApi, UseFrogResult };
