import { IconButton, IconButtonProps } from '@chakra-ui/react';
import { useLocation, useNavigate } from '@tanstack/react-router';
import React from 'react';

import { useUpdateSpace } from 'shared/api/hooks/useUpdateSpace';
import { Menu, MenuDivider, MenuItem, MenuList, MenuTrigger } from 'shared/components/Menu';
import { toaster } from 'shared/components/ui/toaster';
import { selectActiveSpace } from 'shared/selectors/space/selectActiveSpace';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { startPrimaryNoteOperation } from 'shared/store/slices/appSlice';
import { invariant } from 'shared/util/invariant';

import { primaryNote } from 'mobile/routes/primaryNote';

type Props = IconButtonProps;

export const HomeMenu = React.memo((props: Props) => {
  const activeSpace = useAppSelector(selectActiveSpace);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  invariant(activeSpace, 'Missing active space');

  const { mutate } = useUpdateSpace(activeSpace.id);
  const isPrimaryNoteLocation = pathname === primaryNote.fullPath;

  return (
    <Menu
      isContextMenu
      placement="top-start"
      contextMousePosition={false}
    >
      <MenuTrigger
        as={IconButton}
        {...props}
      />
      <MenuList>
        <MenuItem
          label="Change primary note"
          onClick={() => {
            dispatch(startPrimaryNoteOperation());
          }}
        />
        {activeSpace.mainNoteId && (
          <>
            <MenuDivider />
            <MenuItem
              colorScheme="red"
              label="Remove primary note"
              onClick={() => {
                if (isPrimaryNoteLocation) {
                  navigate({ to: '/app' });
                }
                mutate({ mainNoteId: null }, { 
                  onSuccess: () => {
                    toaster.create({
                      title: 'Primary note removed.',
                      type: 'success',
                    });
                  } });
              }}
            />
          </>
        )}
      </MenuList>
    </Menu>
  );
});
