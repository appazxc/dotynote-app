import { useMotionValueEvent, useSpring } from 'motion/react';
import React from 'react';

export const useSpringValue = (value: number) => {
  const springValue = useSpring(value, {
    stiffness: 100, // Spring stiffness
    damping: 20, // Damping
    // duration: 3000,
    // visualDuration: 3000,
  });

  const [result, setResult] = React.useState(value);

  useMotionValueEvent(springValue, 'change', (latest) => {
    setResult(latest);
  });

  // Update motionValue when `value` changes
  React.useEffect(() => {

    springValue.set(value);
  }, [springValue, value]);

  return result;
};