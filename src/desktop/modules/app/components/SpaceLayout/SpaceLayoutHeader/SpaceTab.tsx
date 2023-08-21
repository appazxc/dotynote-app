import { Button } from '@chakra-ui/react';
import React from 'react';
import { spaceTabSelector } from 'shared/selectors';
import { useAppSelector } from 'shared/store/hooks';
import { selectAppSession } from 'shared/store/slices/appSlice';

import { SpaceTabTitle } from './SpaceTabTitle';
import { updateEntity } from 'shared/store/slices/entitiesSlice';
import { useDispatch } from 'react-redux';
import { entityNames } from 'shared/constants/entityNames';

export const SpaceTab = ({ id }) => {
  const dispatch = useDispatch();
  const spaceTab = useAppSelector(state => spaceTabSelector.getById(state, id));
  const appSession = useAppSelector(selectAppSession);

  const handleTabChange = React.useCallback(() => {
    if (!appSession || !spaceTab) return;

    dispatch(updateEntity({ id: appSession.id, type: entityNames.appSession, data: {
      activeSpaceTabId: spaceTab.id
    } }));
  }, [appSession, spaceTab]);

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
      onClick={handleTabChange}
    >
      <SpaceTabTitle path={spaceTab.routes[spaceTab.routes.length - 1]} />
    </Button>
  );
};
