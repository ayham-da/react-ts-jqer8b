import React from 'react';

type ChangeKeyboardEvent<T> = React.KeyboardEvent<T>;

type ObjectEventsType<T> = {
  [key: string]: (e: React.KeyboardEvent<T>) => boolean | void;
};

const handleKey =
  <T>(handlers: ObjectEventsType<T>, prevent = true) =>
  (e: React.KeyboardEvent<T>): void => {
    if (typeof handlers[e.key] === 'function') {
      if (handlers[e.key](e) === false) {
        return;
      }
      if (prevent) {
        e.preventDefault();
      }
    }
  };

export { handleKey, ChangeKeyboardEvent, ObjectEventsType };
