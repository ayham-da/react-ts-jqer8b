import { useEffect, useRef } from 'react';

export const useEventListener = <T>(
  eventName: string,
  handler: (event: T) => void,
  element: Element | null
): void => {
  const savedHandler = useRef<(e: T) => void>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!element) return undefined;
    const isSupported = element && element.addEventListener.bind(this);
    if (!isSupported) return undefined;

    const eventListener = (event: T) =>
      savedHandler.current && savedHandler.current(event);
    element.addEventListener(
      eventName,
      eventListener as unknown as (e: Event) => void
    );

    return () => {
      element.removeEventListener(
        eventName,
        eventListener as unknown as (e: Event) => void
      );
    };
  }, [eventName, element]);
};
