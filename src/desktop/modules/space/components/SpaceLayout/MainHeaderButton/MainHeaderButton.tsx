import React from 'react';

import { IconButton, useToken } from '@chakra-ui/react';
import { GoDotFill } from 'react-icons/go';

import { openTab } from 'shared/actions/space/openTab';
import { useUpdateSpace } from 'shared/api/hooks/useUpdateSpace';
import { Menu, MenuItem, MenuList, MenuTrigger } from 'shared/components/Menu';
import { modalIds } from 'shared/constants/modalIds';
import { SelectNoteModal } from 'shared/containers/modals/SelectNoteModal';
import { hideModal, showModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { selectActiveSpace } from 'shared/store/slices/appSlice';
import { invariant } from 'shared/util/invariant';

import { buildTabHref } from 'desktop/modules/space/helpers/buildTabHref';
import { router } from 'desktop/routes/router';

const extraId = 'MainHeaderButton';

export const MainHeaderButton = () => {
  const dispatch = useAppDispatch();
  const space = useAppSelector(selectActiveSpace);
  const brand = useToken(
    'colors',
    'brand.700'
  );
  invariant(space, 'Missing space');
  
  const { mutate, isPending } = useUpdateSpace(space.id);

  const handleNoteSelect = React.useCallback((value) => {
    if (isPending) {
      return;
    }

    dispatch(hideModal());
    mutate({ mainNoteId: value }, { onSuccess: () => {
      // TODO: toast about success
    } });
  }, [mutate, isPending, dispatch]);
  
  const openMainSpaceNote = React.useCallback(() => {
    if (!space) {
      return;
    }

    const route = space.mainNoteId
      ? buildTabHref({
        to: '/n/$noteId',
        params: { noteId: String(space.mainNoteId) },
      })
      : buildTabHref({
        to: '/addMainNote',
      });
    
    dispatch(
      openTab({
        route,
        makeActive: true,
      })
    );
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
          onClick={openMainSpaceNote}
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
              dispatch(showModal({ id: modalIds.selectNote, extraId }));
            }}
          >
            Change main note
          </MenuItem>
          <MenuItem>Mark as Draft</MenuItem>
          <MenuItem>Delete</MenuItem>
          <MenuItem>Attend a Workshop</MenuItem>
        </MenuList>
      </Menu>

      <SelectNoteModal
        title="Select main note"
        extraId={extraId}
        onSelect={handleNoteSelect}
      />
    </>
  );
};
