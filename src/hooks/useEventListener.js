import { useEffect } from 'react';

// this looks nice.
const useEventListener = (eventType, callback) => {
  useEffect(() => {
    window.addEventListener(eventType, callback, false);
    return () => {
      window.removeEventListener(eventType, callback, false);
    };
  }, [eventType, callback]);
};

export default useEventListener;
