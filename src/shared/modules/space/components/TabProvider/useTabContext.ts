import React from 'react';

import { TabContext } from './TabContext';

export const useTabContext = () => {
  const context = React.useContext(TabContext);
  
  if (context === undefined) {
    throw new Error('useTabContext must be within TabProvider');
  }

  return context;
};