import React from 'react';

import { Box } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';

import { openTab } from 'shared/actions/space/openTab';
import { noteRoutePath } from 'shared/constants/noteRoutePath';
import { buildNoteTabRoute } from 'shared/helpers/buildNoteTabRoute';
import { PostList } from 'shared/modules/noteTab/components/PostList';
import { useAppDispatch } from 'shared/store/hooks';
import { PostEntity } from 'shared/types/entities/PostEntity';

type Props = {
  post: PostEntity
};

export const InternalPosts = React.memo(({ post }: Props) => {
  const { note, internal } = post;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handlePostClick = React.useCallback((event: React.MouseEvent<HTMLDivElement>) => (post: PostEntity) => {
    event.preventDefault();
    const { id } = post.note;

    if (event.metaKey) {
      dispatch(openTab({ 
        route: buildNoteTabRoute(id),
      }));
    } else {
      navigate({ to: noteRoutePath, params: { noteId: id } });
    }
  }, [navigate, dispatch]);

  return (
    <PostList
      pt="2"
      pb="0"
      noteId={note.id}
      sort={note.postsSettings?.sort}
      orderBy={note.postsSettings?.orderById}
      isContextDisabled={true}
      pageSize={internal.max}
      onPostClick={handlePostClick}
    />
  );
});
