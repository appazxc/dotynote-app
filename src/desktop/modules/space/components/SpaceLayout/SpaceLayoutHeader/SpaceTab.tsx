import { Button, IconButton } from '@chakra-ui/react';
import React from 'react';
import { spaceTabSelector } from 'shared/selectors/entities';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { closeTab, updateActiveTabId, selectActiveTabId } from 'shared/store/slices/appSlice';

import { SpaceTabTitle } from 'shared/containers/SpaceTabTitle/SpaceTabTitle';
import { MdClose } from 'react-icons/md';

export const SpaceTab = React.memo(({ id }) => {
  const dispatch = useAppDispatch();
  const spaceTab = useAppSelector(state => spaceTabSelector.getById(state, id));
  const activeTabId = useAppSelector(selectActiveTabId);

  const handleTabChange = React.useCallback(() => {
    if (!spaceTab) return;

    dispatch(updateActiveTabId(spaceTab.id));
  }, [dispatch, spaceTab]);

  if (!spaceTab) {
    return null;
  }

  return (
    <Button
      as="div"
      size="sm"
      variant={activeTabId === id ? 'solid' : 'outline'}
      alignItems="center"
      maxWidth="32"
      flexGrow='1'
      justifyContent="space-between"
      pr="1.5"
      cursor="pointer"
      onClick={handleTabChange}
      iconSpacing="1"
      rightIcon={(
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
      )}
    >
      <SpaceTabTitle path={spaceTab.routes[spaceTab.routes.length - 1]} />
    </Button>
  );
});
