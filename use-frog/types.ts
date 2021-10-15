export type ActionType = {
  type: string;
};

export type DispatchType = (action: ActionType) => void;
export type ReducerType<T> = (state: T, action: ActionType) => T;

export type Position = {
  x: number;
  y: number;
};

export type MoveApi = {
  forward: () => void;
  left: () => void;
  right: () => void;
  backward: () => void;
};

export type UseFrogConfiguration<T extends Position = Position> = {
  initialState: T;
  reducer?: ReducerType<T>;
};

export type FrogPlugin<T, Api = unknown> = {
  reducer?: (newState: T, action: ActionType, state: T) => T;
  getActions?: (dispatch: DispatchType) => Partial<Api>;
  effect?: (api: Api, state: T) => void;
};

export type UseFrogResult<
  T extends Position = Position,
  Api extends MoveApi = MoveApi
> = {
  api: Api;
  state: T;
};
