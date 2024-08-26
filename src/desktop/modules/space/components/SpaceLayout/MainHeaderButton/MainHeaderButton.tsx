import React from 'react';

import { IconButton, useColorModeValue, useToken } from '@chakra-ui/react';
import { GoDotFill } from 'react-icons/go';

import { openTab } from 'shared/actions/space/openTab';
import { Menu, MenuItem, MenuList, MenuTrigger } from 'shared/components/Menu';
import { modalIds } from 'shared/constants/modalIds';
import { PrimaryNoteModal } from 'shared/containers/modals/PrimaryNoteModal';
import { showModal } from 'shared/modules/modal/modalSlice';
import { selectActiveSpace } from 'shared/selectors/space/selectActiveSpace';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { startPrimaryNoteOperation } from 'shared/store/slices/appSlice';
import { invariant } from 'shared/util/invariant';

import { buildTabHref } from 'desktop/modules/space/helpers/buildTabHref';
import { router } from 'desktop/routes/router';

export const MainHeaderButton = () => {
  const dispatch = useAppDispatch();
  const space = useAppSelector(selectActiveSpace);
  const brandToken = useColorModeValue(
    'brand.700',
    'white'
  );
  const brand = useToken('colors', brandToken);

  invariant(space, 'Missing space');
  
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
          <MenuItem
            onClick={() => {
              router.navigate({
                to: '/app/spaces',
              });
            }}
          >
            Spaces
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(startPrimaryNoteOperation());
            }}
          >
            Change primary note
          </MenuItem>
        </MenuList>
      </Menu>

      <PrimaryNoteModal />
    </>
  );
};
