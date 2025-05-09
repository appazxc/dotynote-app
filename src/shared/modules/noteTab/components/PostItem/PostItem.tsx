import { Box } from '@chakra-ui/react';
import { motion } from 'motion/react';
import React from 'react';

import { Post } from 'shared/components/Post';
import { InternalPosts } from 'shared/modules/noteTab/components/PostItem/InternalPosts';
import { PostWithMenu } from 'shared/modules/noteTab/components/PostItem/PostWithMenu';
import { noteSelector, postSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';
import { PostEntity } from 'shared/types/entities/PostEntity';
import { invariant } from 'shared/util/invariant';

type Props = {
  postId: string;
  isSelecting?: boolean;
  hasOverlay?: boolean;
  isSelected?: boolean;
  internalLevel: number;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => (post: PostEntity) => void;
}

export const PostItem = React.memo((props: Props) => {
  const { postId, onClick, isSelecting, isSelected, hasOverlay, internalLevel } = props;
  const getPostById = React.useMemo(() => postSelector.makeGetEntityById(), []);
  const getNoteById = React.useMemo(() => noteSelector.makeGetEntityById(), []);
  const post = useAppSelector(state => getPostById(state, postId));
  const parent = useAppSelector(state => getNoteById(state, post?.parentId));

  invariant(post, 'Missing post', { id: postId });
  invariant(parent, 'Missing parent', { id: post?.parentId });

  const allowInternal = internalLevel === 0;
  const showInternal = allowInternal && parent.postsSettings?.internal && !!post.internal?.max;
  
  const renderedPost = React.useMemo(() => {
    if (post._isDeleted) {
      return null;
    }

    return (
      <Post
        isSelecting={isSelecting}
        isSelected={isSelected}
        hasOverlay={hasOverlay}
        isPinned={!!post.pinnedAt}
        noteId={post.note.id}
        extraId={post.id}
        dots={post.dots}
        note={post.note}
        showDotsAmount={parent.access === 'public'}
        onClick={(event: React.MouseEvent<HTMLDivElement>) => {
          onClick?.(event)(post);
        }}
      />
    );
  }, [isSelecting, isSelected, onClick, post, hasOverlay, parent.access]);

  if (post._isDeleted || post.note._isDeleted) {
    return null;
  }

  return (
    <Box asChild position="relative">
      <motion.div animate={{ left: isSelecting ? '40px' : '0' }}>
        <PostWithMenu
          internalLevel={internalLevel}
          post={post}
          parent={parent}
          isMenuDisabled={isSelected}
        >
          {renderedPost}
        </PostWithMenu>
        {showInternal && (
          <InternalPosts post={post} internalLevel={internalLevel} />
        )}
      </motion.div>
    </Box>
  );
});
