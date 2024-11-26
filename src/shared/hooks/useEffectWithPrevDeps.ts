import React from 'react';

const useEffectWithPrevDeps = <const T extends readonly any[]>(
  cb: (args: T | readonly []) => void, dependencies: T
) => {
  const prevDepsRef = React.useRef<T>();

  return React.useEffect(() => {
    const prevDeps = prevDepsRef.current;
    prevDepsRef.current = dependencies;

    return cb(prevDeps || []);

  }, dependencies);
};

export default useEffectWithPrevDeps;
