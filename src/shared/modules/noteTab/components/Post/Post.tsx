import { Box } from '@chakra-ui/react';
import React from 'react';

import { Post as PostComponent } from 'shared/components/Post';
import { InternalPosts } from 'shared/modules/noteTab/components/Post/InternalPosts';
import { PostWithMenu } from 'shared/modules/noteTab/components/Post/PostWithMenu';
import { noteSelector, postSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';
import { PostEntity } from 'shared/types/entities/PostEntity';
import { invariant } from 'shared/util/invariant';

type Props = {
  postId: number;
  isSelecting?: boolean;
  isSelected?: boolean;
  internalLevel: number;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => (post: PostEntity) => void;
  onDelete: (postId: number) => void;
}

export const Post = React.memo((props: Props) => {
  const { postId, onClick, onDelete, isSelecting, isSelected, internalLevel } = props;
  const getPostById = React.useMemo(() => postSelector.makeGetEntityById(), []);
  const getNoteById = React.useMemo(() => noteSelector.makeGetEntityById(), []);
  const post = useAppSelector(state => getPostById(state, postId));
  const parent = useAppSelector(state => getNoteById(state, post?.parentId));

  invariant(post && parent, 'Missing post or parent', { id: postId, parentId: post?.parentId });

  const allowInternal = internalLevel === 0;
  const showInternal = allowInternal && parent.postsSettings?.internal && !!post.internal?.max;
  
  React.useEffect(() => {
    if ((post._isDeleted || post.note._isDeleted) && onDelete) {
      onDelete(postId);
    }
  }, [post._isDeleted, post.note._isDeleted, onDelete, postId]);

  const renderedPost = React.useMemo(() => {
    if (post._isDeleted) {
      return null;
    }

    return (
      <PostComponent
        isSelecting={isSelecting}
        isSelected={isSelected}
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
  }, [isSelecting, isSelected, onClick, post, parent.access]);

  if (post._isDeleted || post.note._isDeleted) {
    return null;
  }

  return (
    <Box>
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
    </Box>
  );
});
