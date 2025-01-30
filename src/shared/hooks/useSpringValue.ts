import { useMotionValueEvent, useSpring } from 'motion/react';
import React from 'react';

export const useSpringValue = (value: number) => {
  const springValue = useSpring(value, {
    stiffness: 100, // Жесткость пружины
    damping: 20, // Затухание
    // duration: 3000,
    // visualDuration: 3000,
  });

  const [result, setResult] = React.useState(value);

  useMotionValueEvent(springValue, 'change', (latest) => {
    setResult(latest);
  });

  // Обновляем motionValue при изменении `value`
  React.useEffect(() => {

    springValue.set(value);
  }, [springValue, value]);

  return result;
};