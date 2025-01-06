import { IconButton, useToken } from '@chakra-ui/react';
import React from 'react';
import { GoDotFill } from 'react-icons/go';

import { openTab } from 'shared/actions/space/openTab';
import { useSpaces } from 'shared/api/hooks/useSpaces';
import { useUpdateSpace } from 'shared/api/hooks/useUpdateSpace';
import { Menu, MenuDivider, MenuItem, MenuList, MenuSub, MenuTrigger } from 'shared/components/Menu';
import { useColorModeValue } from 'shared/components/ui/color-mode';
import { toaster } from 'shared/components/ui/toaster';
import { modalIds } from 'shared/constants/modalIds';
import { PrimaryNoteModal } from 'shared/containers/modals/PrimaryNoteModal';
import { showModal } from 'shared/modules/modal/modalSlice';
import { selectActiveSpace } from 'shared/selectors/space/selectActiveSpace';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { startPrimaryNoteOperation } from 'shared/store/slices/appSlice';
import { invariant } from 'shared/util/invariant';

import { SpaceMenuItem } from 'desktop/modules/space/components/SpaceLayout/DotHeaderButton/SpaceMenuItem';
import { buildTabHref } from 'desktop/modules/space/helpers/buildTabHref';
import { router } from 'desktop/routes/router';

export const DotHeaderButton = () => {
  const dispatch = useAppDispatch();
  const space = useAppSelector(selectActiveSpace);
  const brandToken = useColorModeValue(
    'brand.700',
    'white'
  );
  const [brand] = useToken('colors', brandToken);
  const { data: spaceIds = [] } = useSpaces();
  invariant(space, 'Missing space');
  
  const { mutate } = useUpdateSpace(space.id);

  const handleRemovePrimaryNote = React.useCallback(() => {
    mutate({
      mainNoteId: null,
    }, {
      onSuccess: () => {
        toaster.create({
          description: 'Primary note removed.',
        });
      },
    });
  }, [mutate]);

  const handlePrimaryNoteButtonClick = React.useCallback(() => {
    if (!space) {
      return;
    }

    if (space.mainNoteId) {
      dispatch(
        openTab({
          route: buildTabHref({
            to: '/n/$noteId',
            params: { noteId: String(space.mainNoteId) },
          }),
          active: true,
        })
      );
    } else {
      dispatch(showModal({ id: modalIds.primaryNote }));
    }
    
  }, [dispatch, space]);
  
  return (
    <>
      <Menu
        isContextMenu
        contextMousePosition={false}
      >
        <MenuTrigger>
          <IconButton
            position="relative"
            size="xs"
            iconSize="auto"
            aria-label="Side note menu"
            colorScheme={space.mainNoteId ? undefined : 'gray'}
            variant="outline"
            onClick={handlePrimaryNoteButtonClick}
          >
            <GoDotFill size="30" color={space.mainNoteId ? brand : 'gray'} />
          </IconButton>
        </MenuTrigger>
        <MenuList>
          <MenuSub
            label="Spaces"
            onClick={() => {
              router.navigate({
                to: '/app/spaces',
              });
            }}
          >
            {spaceIds.map((id) => {
              return <SpaceMenuItem key={id} spaceId={id} />;
            })}
          </MenuSub>
          <MenuSub label="Primary note">
            {space.mainNoteId && (
              <MenuItem
                label="Change"
                onClick={() => {
                  dispatch(startPrimaryNoteOperation());
                }}
              />
            )}
            {!space.mainNoteId && (
              <MenuItem
                label="Set"
                onClick={() => {
                  dispatch(showModal({ id: modalIds.primaryNote }));
                }}
              />
            )}
            <MenuDivider />
            <MenuItem
              label="Remove"
              colorScheme="red"
              onClick={handleRemovePrimaryNote}
            />
          </MenuSub>
        </MenuList>
      </Menu>
      <PrimaryNoteModal />
    </>
  );
};
