import React from 'react';

import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';

import { TabContext } from './TabContext';

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