import { useEffect, useRef } from 'react';
import { FrogPlugin } from './types';

export const useEffects = <T, Api>(
  state: T,
  api: Api,
  plugins: FrogPlugin<T, Api>[],
  delay: number
): void => {
  const currentState = useRef(state);
  currentState.current = state;

  const effects = useRef(() => {
    plugins.forEach((plugin) => {
      if (plugin.effect) {
        plugin.effect(api, currentState.current);
      }
    });
  });

  useEffect(() => {
    const interval = setInterval(() => {
      effects.current();
    }, delay);
    return () => clearTimeout(interval);
  }, [delay]);
};
