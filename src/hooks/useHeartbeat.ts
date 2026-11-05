import { useEffect, useState } from 'react';

export function useHeartbeat(interval = 1500) {
  const [beat, setBeat] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setBeat(true);
      setTimeout(() => setBeat(false), 200);
    }, interval);
    return () => clearInterval(timer);
  }, [interval]);

  return beat;
}
