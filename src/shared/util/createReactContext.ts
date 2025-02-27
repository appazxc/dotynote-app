import React from 'react';

export const createReactContext = <T>() => {
  return React.createContext<T | null>(null);
};