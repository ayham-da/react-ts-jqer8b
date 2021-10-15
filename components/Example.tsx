import React, { FC, useMemo } from 'react';
import { useEventListener } from '../use-event-listener';
import { handleKey } from '../handle-key';
import {
  JumpApi,
  JumpFrogState,
  jumpPlugin,
  limitPlugin,
  mazePlugin,
} from '../plugins';
import { useFrog } from '../use-frog';
import { Brick } from './Brick';
import { Frog } from './Frog';

type ExampleType = {
  maze: number[][];
};

const Example: FC<ExampleType> = ({ maze }) => {
  const plugins = useMemo(
    () => [jumpPlugin, mazePlugin(maze), limitPlugin(15, 15)],
    [maze]
  );
  const {
    state,
    api: { left, right, forward, backward, jump },
  } = useFrog<JumpFrogState, JumpApi>(
    {
      initialState: {
        x: 5,
        y: 0,
        z: 0,
      },
    },
    plugins
  );
  useEventListener(
    'keydown',
    handleKey({
      ArrowUp: forward,
      ArrowDown: backward,
      ArrowLeft: left,
      ArrowRight: right,
      ' ': jump,
    }),
    document.body
  );
  return (
    <div>
      <div>{JSON.stringify(state)}</div>
      <div style={{ minHeight: 400, minWidth: 400, position: 'relative' }}>
        {maze.map((row, i) =>
          row.map((depth, j) => (
            <Brick
              key={`brick${i}.${j}`}
              x={j}
              y={i}
              style={{ background: `rgba(0,0,0,${0.1 * maze?.[i]?.[j]})` }}
            />
          ))
        )}
        <Brick x={state.x} y={state.y} size={state.z} component={Frog} />
      </div>
    </div>
  );
};
export { Example, ExampleType };
