import { useCallback, useRef } from 'react';

export const useDebouncedCallback = <TArgs extends unknown[]>(
  func: (...args: TArgs) => void,
  wait: number
) => {
  const timeout = useRef<NodeJS.Timeout>();

  return useCallback(
    (...args: TArgs) => {
      const later = () => {
        if (timeout.current) {
          clearTimeout(timeout.current);
        }
        func(...args);
      };

      if (timeout.current) {
        clearTimeout(timeout.current);
      }

      timeout.current = setTimeout(later, wait);
    },
    [func, wait]
  );
};
