import React from 'react';

import { Button, IconButton, Box } from '@chakra-ui/react';
import { MdClose } from 'react-icons/md';

import { closeTab } from 'shared/actions/space/closeTab';
import { SpaceTabTitle } from 'shared/containers/SpaceTabTitle/SpaceTabTitle';
import { spaceTabSelector } from 'shared/selectors/entities';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { updateActiveTabId, selectActiveTabId } from 'shared/store/slices/appSlice';
import { IdentityType } from 'shared/types/entities/BaseEntity';

type Props = {
  id: IdentityType,
}

export const SpaceTab = React.memo(({ id }: Props) => {
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

  const isActive = activeTabId === id;
  
  return (
    <Button
      as="div"
      size="sm"
      variant={!isActive ? 'solid' : 'outline'}
      colorScheme={!isActive ? 'gray' : 'brand'}
      alignItems="center"
      maxWidth="32"
      minW="3"
      flexGrow="1"
      justifyContent="space-between"
      px="1.5"
      iconSpacing="1"
      cursor="pointer"
      onClick={handleTabChange}
      sx={{
        containerType: 'size',
        ...isActive ? {
          '@container (max-width: 30px)': {
            '& > .chakra-button__icon': { 
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              marginInlineStart: 0, 
            },
          },
        } : {},
      }}
      rightIcon={(
        <Box
          sx={isActive ? {} : {
            '@container (max-width: 30px)': {
              '&': { display: 'none' },
            },
          }}
        >
          <IconButton
            h="5"
            w="5"
            minW="5"
            aria-label="close"
            variant="ghost"
            colorScheme="gray"
            icon={<MdClose size="13px" />}
            borderRadius="50%"
            onClick={(event: React.SyntheticEvent<HTMLButtonElement>) => {
              event.stopPropagation();
              dispatch(closeTab(id));
            }}
          />
        </Box>
      )}
    >
      <Box
        position="relative"
        display="flex"
        flexGrow="1"
        h="full"
        sx={isActive ? {
          '@container (max-width: 25px)': {
            '&': { display: 'none' },
          },
        } : {}}
      >
        <Box
          position="absolute"
          h="full"
          w="full"
          display="flex"
          alignItems="center"
        >
          <SpaceTabTitle path={spaceTab.routes[spaceTab.routes.length - 1]} />
        </Box>
      </Box>
    </Button>
  );
});
