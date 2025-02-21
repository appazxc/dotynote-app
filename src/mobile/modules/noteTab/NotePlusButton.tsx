import { LuPlus } from 'react-icons/lu';

import { Button } from 'shared/components/ui/button';
import { drawerIds } from 'shared/constants/drawerIds';
import { showDrawer } from 'shared/modules/drawer/drawerSlice';
import { useAppDispatch } from 'shared/store/hooks';

import { NoteMenuDrawer } from 'mobile/containers/drawers/NoteMenuDrawer';

type Props = {
  noteId: number;
}

export const NotePlusButton = ({ noteId }: Props) => {
  const dispatch = useAppDispatch();
  
  return (
    <>
      <Button
        borderRadius="full"
        position="absolute"
        right="16px"
        bottom="10px"
        w="55px"
        h="55px"
        onClick={() => {
          dispatch(showDrawer({ id: drawerIds.dotNoteMenu }));
        }}
      >
        <LuPlus />
      </Button>
      <NoteMenuDrawer noteId={noteId} />
    </>
  );
};
