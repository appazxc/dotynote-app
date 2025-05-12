import { Box } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'motion/react';
import React from 'react';

import { Post } from 'shared/components/Post';
import { Checkbox } from 'shared/components/ui/checkbox';
import { WithNoteMenu } from 'shared/modules/noteTab/components/NoteItem/WithNoteMenu';
import { noteSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';
import { NoteEntity } from 'shared/types/entities/NoteEntity';
import { invariant } from 'shared/util/invariant';

type Props = {
  noteId: string;
  parentId: string;
  isSelecting?: boolean;
  hasOverlay?: boolean;
  isSelected?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => (note: NoteEntity) => void;
  onOverlayClick?: (event: React.MouseEvent<HTMLDivElement>) => (note: NoteEntity) => void;
}

const SELECTING_OFFSET = '40px';

export const NoteItem = React.memo((props: Props) => {
  const { noteId, onClick, isSelecting, isSelected, parentId, hasOverlay } = props;
  const getNoteById = React.useMemo(() => noteSelector.makeGetEntityById(), []);
  const note = useAppSelector(state => getNoteById(state, noteId));

  invariant(note, 'Missing note', { id: noteId });

  const renderedView = React.useMemo(() => {
    if (note._isDeleted) {
      return null;
    }

    return (
      <Post
        noteId={noteId}
        extraId={`${noteId}-view`}
        note={note}
        onClick={(event: React.MouseEvent<HTMLDivElement>) => {
          onClick?.(event)(note);
        }}
      />
    );
  }, [onClick, note, noteId]);

  const renderedSelectingContent = React.useMemo(() => {
    return (
      <AnimatePresence>
        {isSelecting && (
          <Box
            asChild
            p="2"
            position="absolute"
            left={`-${SELECTING_OFFSET}`}
            top="0"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
            >
              <Checkbox
                size="md"
                borderRadius="full"
                radius="full"
                checked={isSelected}
              />
            </motion.div>
          </Box>
        )}
      </AnimatePresence>
    );
  }, [isSelecting, isSelected]);
  
  const renderedOverlay = React.useMemo(() => {
    if (!hasOverlay) {
      return null;
    }

    return (
      <Box
        position="absolute"
        top="0"
        bottom="0"
        left={isSelecting ? `-${SELECTING_OFFSET}` : '0'}
        right="0"
        cursor="pointer"
        onClick={(event) => {
          event.stopPropagation();
          onClick?.(event)(note);
        }}
      />
    );
  }, [hasOverlay, isSelecting, onClick, note]);

  if (note._isDeleted) {
    return null;
  }

  return (
    <Box asChild position="relative">
      <motion.div animate={{ left: isSelecting ? SELECTING_OFFSET : '0' }}>
        <WithNoteMenu
          note={note}
          parentId={parentId}
          isMenuDisabled={hasOverlay}
        >
          {renderedView}
        </WithNoteMenu>
        {renderedSelectingContent}
        {renderedOverlay}
      </motion.div>
    </Box>
  );
});
