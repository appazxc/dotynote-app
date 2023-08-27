import { Button, IconButton } from '@chakra-ui/react';
import React from 'react';
import { spaceTabSelector } from 'shared/selectors/entities';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { closeTab, selectAppSession } from 'shared/store/slices/appSlice';

import { SpaceTabTitle } from './SpaceTabTitle';
import { updateEntity } from 'shared/store/slices/entitiesSlice';
import { entityNames } from 'shared/constants/entityNames';
import { MdClose } from 'react-icons/md';

export const SpaceTab = ({ id }) => {
  const dispatch = useAppDispatch();
  const spaceTab = useAppSelector(state => spaceTabSelector.getById(state, id));
  const appSession = useAppSelector(selectAppSession);

  const handleTabChange = React.useCallback(() => {
    if (!appSession || !spaceTab) return;

    dispatch(updateEntity({ id: appSession.id, type: entityNames.appSession, data: {
      activeSpaceTabId: spaceTab.id
    } }));
  }, [dispatch, appSession, spaceTab]);

  if (!spaceTab || !appSession) {
    return null;
  }

  return (
    <Button
      as="div"
      size="sm"
      variant={appSession.activeSpaceTabId === id ? 'solid' : 'outline'}
      alignItems="center"
      maxWidth="32"
      flexGrow='1'
      justifyContent="space-between"
      pr="1.5"
      cursor="pointer"
      onClick={handleTabChange}
    >
      <SpaceTabTitle path={spaceTab.routes[spaceTab.routes.length - 1]} />
      <IconButton
        h="5"
        w="5"
        minW="5"
        aria-label="close"
        icon={<MdClose size="13px" />}
        borderRadius="50%"
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          event.stopPropagation();
          dispatch(closeTab(id));
        }}
      />
    </Button>
  );
};
