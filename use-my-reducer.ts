import { useCallback, useState } from 'react';

type ActionType = {
  type: string;
};

export type UseReducerResultType<T, A extends ActionType> = {
  dispatch: (action: A) => void;
  state: T;
};

const useMyReducer = <T, A extends ActionType>(
  reducer: (state: T, action: A) => T,
  initialState: T
): UseReducerResultType<T, A> => {
  const [state, setCurrentState] = useState<T>(initialState);
  const dispatch = useCallback(
    (action: A) => setCurrentState((s) => reducer(s, action)),
    [reducer]
  );

  return {
    state,
    dispatch,
  };
};

export { useMyReducer };
