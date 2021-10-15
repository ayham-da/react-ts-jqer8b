import React, { FC } from 'react';

type FrogType = {
  style: Record<string, unknown>;
};

const Frog: FC<FrogType> = (props) => (
  <img {...props} alt="Frog" src="https://i.redd.it/thsrb5is0xtz.jpg" />
);

export { Frog, FrogType };
