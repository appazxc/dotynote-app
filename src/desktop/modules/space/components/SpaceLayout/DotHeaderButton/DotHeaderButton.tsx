import React from 'react';

import { IconButton, useColorModeValue, useToast, useToken } from '@chakra-ui/react';
import { GoDotFill } from 'react-icons/go';

import { openTab } from 'shared/actions/space/openTab';
import { useSpaces } from 'shared/api/hooks/useSpaces';
import { useUpdateSpace } from 'shared/api/hooks/useUpdateSpace';
import { Menu, MenuItem, MenuList, MenuTrigger, MenuSub, MenuDivider } from 'shared/components/Menu';
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
  const toast = useToast();
  const brand = useToken('colors', brandToken);
  const { data: spaceIds = [] } = useSpaces();
  invariant(space, 'Missing space');
  
  const { mutate } = useUpdateSpace(space.id);

  const handleRemovePrimaryNote = React.useCallback(() => {
    mutate({
      mainNoteId: null,
    }, {
      onSuccess: () => {
        toast({
          description: 'Primary note removed.',
        });
      },
    });
  }, [mutate, toast]);

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
          makeActive: true,
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
        <MenuTrigger
          as={IconButton}
          position="relative"
          size="sm"
          aria-label="Side note menu"
          colorScheme={space.mainNoteId ? 'brand' : 'gray'}
          icon={<GoDotFill size="30" color={space.mainNoteId ? brand : 'gray'} />}
          variant="outline"
          isActive={false}
          onClick={handlePrimaryNoteButtonClick}
        />
        <MenuList>
          <MenuSub
            label="Spaces"
            onClick={() => {
              router.navigate({
                to: '/app/spaces',
              });
            }}
          >
            <MenuList>
              {spaceIds.map((id) => {
                return <SpaceMenuItem key={id} spaceId={id} />;
              })}
            </MenuList>
          </MenuSub>
          <MenuSub label="Primary note">
            <MenuList>
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
            </MenuList>
          </MenuSub>
        </MenuList>
      </Menu>
      <PrimaryNoteModal />
    </>
  );
};
