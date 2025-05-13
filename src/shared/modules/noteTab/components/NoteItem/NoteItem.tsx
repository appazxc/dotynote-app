import { Box } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'motion/react';
import React from 'react';

import { openTab } from 'shared/actions/space/openTab';
import { Post } from 'shared/components/Post';
import { Checkbox } from 'shared/components/ui/checkbox';
import { noteRoutePath } from 'shared/constants/noteRoutePath';
import { buildNoteTabRoute } from 'shared/helpers/buildNoteTabRoute';
import { WithNoteMenu } from 'shared/modules/noteTab/components/NoteItem/WithNoteMenu';
import { noteSelector } from 'shared/selectors/entities';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

type Props = {
  noteId: string;
  parentId: string;
  isSelecting?: boolean;
  hasOverlay?: boolean;
  isSelected?: boolean;
  onOverlayClick?: (event: React.MouseEvent<HTMLDivElement>) => (id: string) => void;
}

const SELECTING_OFFSET = '40px';

export const NoteItem = React.memo((props: Props) => {
  const { noteId, isSelecting, isSelected, parentId, hasOverlay, onOverlayClick } = props;
  const getNoteById = React.useMemo(() => noteSelector.makeGetEntityById(), []);
  const note = useAppSelector(state => getNoteById(state, noteId));
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  invariant(note, 'Missing note', { id: noteId });

  const onClick = React.useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (event.metaKey) {
      dispatch(openTab({ 
        route: buildNoteTabRoute(noteId),
      }));
    } else {
      navigate({ to: noteRoutePath, params: { noteId } });
    }
  }, [navigate, dispatch, noteId]);

  const renderedView = React.useMemo(() => {
    if (note._isDeleted) {
      return null;
    }

    return (
      <Post
        noteId={noteId}
        extraId={`${noteId}-view`}
        note={note}
        onClick={onClick}
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
          onOverlayClick?.(event)(note.id);
        }}
      />
    );
  }, [hasOverlay, isSelecting, onOverlayClick, note]);

  if (note._isDeleted) {
    return null;
  }

  return (
    <Box asChild position="relative">
      <motion.div animate={{ left: isSelecting ? SELECTING_OFFSET : '0' }}>
        <WithNoteMenu
          parentId={parentId}
          note={note}
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
