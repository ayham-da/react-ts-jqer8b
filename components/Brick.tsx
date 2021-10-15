import React, { FC } from 'react';

type BrickType = {
  x: number;
  y: number;
  size?: number;
  style?: Record<string, unknown>;
  component?: FC<{ style: Record<string, unknown> }>;
};

const defaultSize = 40;
const k = 4;

const Brick: FC<BrickType> = ({
  component: Render = 'div',
  x,
  y,
  style = {},
  size = 0,
}) => (
  <Render
    style={{
      ...style,
      position: 'absolute',
      left: 100 + x * defaultSize - k * size,
      top: 600 - y * defaultSize - k * size,
      width: defaultSize + 2 * k * size,
      height: defaultSize + 2 * k * size,
      transition: 'all 200ms ease',
    }}
  />
);

export { Brick, BrickType };
