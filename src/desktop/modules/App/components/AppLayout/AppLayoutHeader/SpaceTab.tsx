import { Button } from '@chakra-ui/react';
import React from 'react';
import { spaceTabSelector } from 'shared/selectors';
import { useAppSelector } from 'shared/store/hooks';
import { selectAppSession } from 'shared/store/slices/appSlice';

import { SpaceTabTitle } from './SpaceTabTitle';

export const SpaceTab = ({ id }) => {
  const spaceTab = useAppSelector(state => spaceTabSelector.getById(state, id));
  const appSession = useAppSelector(selectAppSession);

  if (!spaceTab || !appSession) {
    return null;
  }

  return (
    <Button
      size="sm"
      variant={appSession.activeSpaceTabId === id ? 'solid' : 'outline'}
      alignItems="center"
      maxWidth="32"
      flexGrow='1'
      justifyContent="flex-start"
    >
      <SpaceTabTitle path={spaceTab.routes[spaceTab.routes.length - 1]} />
    </Button>
  );
};
