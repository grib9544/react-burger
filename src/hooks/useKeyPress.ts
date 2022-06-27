import { useEffect, useState } from 'react';

export const useKeyPress = (key: string): boolean => {
  const [keyPressed, setKeyPressed] = useState(false);

  function downHandler({ code }: KeyboardEvent) {
    if (code === key) {
      setKeyPressed(true);
    }
  }

  function upHandler({ code }: KeyboardEvent) {
    if (code === key) {
      setKeyPressed(true);
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', downHandler);
    document.addEventListener('keyup', upHandler);

    return () => {
      document.removeEventListener('keydown', downHandler);
      document.removeEventListener('keyup', upHandler);
    };
  }, []);

  return keyPressed;
};
