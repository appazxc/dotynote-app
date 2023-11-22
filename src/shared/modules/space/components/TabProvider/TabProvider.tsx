import React from 'react';

import { TabContext } from './TabContext';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';

type Props = {
  children: React.ReactNode,
  tab: SpaceTabEntity,
}

export const TabProvider = ({ children, tab }: Props) => {
  return (
    <TabContext.Provider value={tab}>
      {children}
    </TabContext.Provider>
  );
};