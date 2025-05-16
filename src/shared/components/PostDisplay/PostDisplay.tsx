import { Box } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'motion/react';
import React from 'react';

import { PostSchemaView } from 'shared/components/PostDisplay/PostSchemaView';
import { WithMenu } from 'shared/components/PostDisplay/WithMenu';
import { Checkbox } from 'shared/components/ui/checkbox';
import { InternalPosts } from 'shared/modules/noteTab/components/PostItem/InternalPosts';
import { noteSelector, postSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';
import { PostEntity } from 'shared/types/entities/PostEntity';
import { invariant } from 'shared/util/invariant';

type Props = {
  noteId: string;
  postId?: string;
  parentId?: string;
  isSelecting?: boolean;
  hasOverlay?: boolean;
  isSelected?: boolean;
  internalLevel: number;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => (post: PostEntity) => void;
  onOverlayClick?: (event: React.MouseEvent<HTMLDivElement>) => (id: string) => void;
}

const SELECTING_OFFSET = '40px';

export const PostDisplay = React.memo((props: Props) => {
  const { noteId, postId, parentId, onOverlayClick, isSelecting, isSelected, hasOverlay, internalLevel } = props;
  const getNoteById = React.useMemo(() => noteSelector.makeGetEntityById(), []);
  const getParentById = React.useMemo(() => noteSelector.makeGetEntityById(), []);
  const getPostById = React.useMemo(() => postSelector.makeGetEntityById(), []);
  const note = useAppSelector(state => getNoteById(state, noteId));
  const post = useAppSelector(state => getPostById(state, postId));
  const parent = useAppSelector(state => getParentById(state, parentId));

  invariant(note, 'Missing post', { id: noteId });

  const allowInternal = !internalLevel;
  const showInternal = allowInternal && parent?.postsSettings?.internal && !!post?.internal?.max;

  const renderedView = React.useMemo(() => {
    if (note._isDeleted) {
      return null;
    }

    return (
      <PostSchemaView />
    );
  }, [note]);

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
          onOverlayClick?.(event)(postId || noteId);
        }}
      />
    );
  }, [hasOverlay, isSelecting, onOverlayClick, postId, noteId]);

  if (note._isDeleted) {
    return null;
  }

  return (
    <Box asChild position="relative">
      <motion.div animate={{ left: isSelecting ? SELECTING_OFFSET : '0' }}>
        <WithMenu>
          {renderedView}
        </WithMenu>
        {showInternal && (
          <InternalPosts post={post} internalLevel={internalLevel} />
        )}
        {renderedSelectingContent}
        {renderedOverlay}
      </motion.div>
    </Box>
  );
});
