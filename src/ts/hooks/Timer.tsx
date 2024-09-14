import { useState, useEffect } from 'react';

const Timer = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(true);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive]);

  const resetTimer = () => {
    const finishTime = seconds;
    setSeconds(0);
    setIsActive(false);
    return finishTime;
  };

  return {
    seconds,
    resetTimer,
    startTimer: () => setIsActive(true),
    stopTimer: () => setIsActive(false)
  }
};

export default Timer;