import { useState } from 'react';

const KEY = 'continuara_welcomed';

export function useWelcome() {
  const [hasSeenWelcome, setHasSeenWelcome] = useState(() => {
    return localStorage.getItem(KEY) === 'true';
  });

  const markWelcomed = () => {
    localStorage.setItem(KEY, 'true');
    setHasSeenWelcome(true);
  };

  return { hasSeenWelcome, markWelcomed };
}
