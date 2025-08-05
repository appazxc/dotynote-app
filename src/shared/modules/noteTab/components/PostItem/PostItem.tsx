import { Box } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'motion/react';
import React from 'react';

import { openTab } from 'shared/actions/space/openTab';
import { Post } from 'shared/components/Post';
import { Checkbox } from 'shared/components/ui/checkbox';
import { noteRoutePath } from 'shared/constants/noteRoutePath';
import { buildNoteTabRoute } from 'shared/helpers/buildNoteTabRoute';
import { NestedPosts } from 'shared/modules/noteTab/components/PostItem/NestedPosts';
import { PostWithMenu } from 'shared/modules/noteTab/components/PostItem/PostWithMenu';
import { noteSelector, postSelector } from 'shared/selectors/entities';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { PostEntity } from 'shared/types/entities/PostEntity';
import { invariant } from 'shared/util/invariant';

type Props = {
  postId: string;
  isSelecting?: boolean;
  hasOverlay?: boolean;
  isSelected?: boolean;
  nestedLevel?: number;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => (post: PostEntity) => void;
  onOverlayClick?: (event: React.MouseEvent<HTMLDivElement>) => (id: string) => void;
}

const SELECTING_OFFSET = '40px';

export const PostItem = React.memo((props: Props) => {
  const { postId, isSelecting, isSelected, hasOverlay, onOverlayClick, nestedLevel } = props;
  const getPostById = React.useMemo(() => postSelector.makeGetEntityById(), []);
  const getNoteById = React.useMemo(() => noteSelector.makeGetEntityById(), []);
  const post = useAppSelector(state => getPostById(state, postId));
  const parent = useAppSelector(state => getNoteById(state, post?.parentId));
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  invariant(post, 'Missing post', { id: postId });
  invariant(parent, 'Missing parent', { id: post?.parentId });

  const allowNested = !nestedLevel;
  const showNested = allowNested && parent.postsSettings?.nested && !!post.nested?.max;

  const onClick = React.useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (event.metaKey) {
      dispatch(openTab({ 
        path: buildNoteTabRoute(post.noteId),
      }));
    } else {
      navigate({ to: noteRoutePath, params: { noteId: post.noteId } });
    }
  }, [navigate, dispatch, post.noteId]);

  const renderedPost = React.useMemo(() => {
    if (post._isDeleted) {
      return null;
    }

    return (
      <Post
        isPinned={!!post.pinnedAt}
        noteId={post.note.id}
        extraId={post.id}
        note={post.note}
        showDotsAmount={parent.access === 'public'}
        onClick={onClick}
      />
    );
  }, [onClick, post, parent.access]);

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
          onOverlayClick?.(event)(postId);
        }}
      />
    );
  }, [hasOverlay, isSelecting, onOverlayClick, postId]);

  if (post._isDeleted || post.note._isDeleted) {
    return null;
  }

  return (
    <Box asChild position="relative">
      <motion.div animate={{ left: isSelecting ? SELECTING_OFFSET : '0' }}>
        <PostWithMenu
          nestedLevel={nestedLevel}
          post={post}
          parentId={post.parentId}
          canShowNested={parent.postsSettings?.nested}
          isMenuDisabled={hasOverlay}
        >
          {renderedPost}
        </PostWithMenu>
        {showNested && (
          <NestedPosts post={post} nestedLevel={nestedLevel} />
        )}
        {renderedSelectingContent}
        {renderedOverlay}
      </motion.div>
    </Box>
  );
});
