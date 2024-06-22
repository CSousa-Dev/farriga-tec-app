import { useEffect, useCallback } from 'react';
import { EventData, EventType } from '../services/Events/EventType';
import eventEmitter from '../services/Events/EventEmitter';

export const useEventEmitter = () => {
  const emitEvent = useCallback(<T extends EventType>(event: T, data: EventData[T]) => {
    eventEmitter.emit(event, data);
  }, []);

  const useEventListener = <T extends EventType>(
    event: T,
    handler: (data: EventData[T]) => void
  ) => {
    useEffect(() => {
      eventEmitter.on(event, handler);

      return () => {
        eventEmitter.off(event, handler);
      };
    }, [event, handler]);
  };

  return { emitEvent, useEventListener };
};
