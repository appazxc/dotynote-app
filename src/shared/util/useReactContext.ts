import React, { Context } from 'react';

export const useReactContext = <T>(context: Context<T | null>): T => {
  const cxt = React.useContext(context);

  if (cxt == null) {
    throw new Error(`useReactContext must be used within a ${context.Provider}`);
  }

  return cxt;
};