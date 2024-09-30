import { Button, Text } from '@chakra-ui/react';

import { drawerIds } from 'shared/constants/drawerIds';
import { showDrawer } from 'shared/modules/drawer/drawerSlice';
import { useAppDispatch } from 'shared/store/hooks';

import { NoteMenuDrawer } from 'mobile/containers/drawers/NoteMenuDrawer';

type Props = {
  noteId: number,
}

export const NotePlusButton = ({ noteId }: Props) => {
  const dispatch = useAppDispatch();
  
  return (
    <>
      <Button
        borderRadius="full"
        position="absolute"
        right="10px"
        bottom="10px"
        w="44px"
        h="44px"
        onClick={() => {
          dispatch(showDrawer({ id: drawerIds.dotNoteMenu }));
        }}
      >
        <Text display="flex">+</Text>
      </Button>
      <NoteMenuDrawer noteId={noteId} />
    </>
  );
};
