import React from 'react';

import { IconButton, IconButtonProps, useToast } from '@chakra-ui/react';
import { useLocation, useNavigate } from '@tanstack/react-router';

import { useUpdateSpace } from 'shared/api/hooks/useUpdateSpace';
import { Menu, MenuDivider, MenuItem, MenuList, MenuTrigger } from 'shared/components/Menu';
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
  const toast = useToast();
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
          onClick={() => {
            dispatch(startPrimaryNoteOperation());
          }}
        >
          Change primary note
        </MenuItem>
        {activeSpace.mainNoteId && (
          <>
            <MenuDivider />
            <MenuItem
              onClick={() => {
                if (isPrimaryNoteLocation) {
                  navigate({ to: '/app' });
                }
                mutate({ mainNoteId: null }, { 
                  onSuccess: () => {
                    toast({
                      title: 'Primary note removed.',
                      status: 'success',
                      isClosable: true,
                    });
                  } });
              }}
              colorScheme="red"
            >
              Remove primary note
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
});
