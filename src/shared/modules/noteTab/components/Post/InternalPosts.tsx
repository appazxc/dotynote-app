import { useNavigate } from '@tanstack/react-router';
import React from 'react';

import { openTab } from 'shared/actions/space/openTab';
import { useNote } from 'shared/api/hooks/useNote';
import { noteRoutePath } from 'shared/constants/noteRoutePath';
import { buildNoteTabRoute } from 'shared/helpers/buildNoteTabRoute';
import { PostList } from 'shared/modules/noteTab/components/PostList';
import { useAppDispatch } from 'shared/store/hooks';
import { PostEntity } from 'shared/types/entities/PostEntity';

type Props = {
  post: PostEntity;
  internalLevel: number;
};

export const InternalPosts = React.memo(({ post, internalLevel }: Props) => {
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
      disablePagination
      pt="2"
      pb="0"
      noteId={note.id}
      // get sort and orderBy from post.internal.note.postSettings
      sort={note?.postsSettings?.sort}
      orderBy={note.postsSettings?.orderById}
      internalLevel={internalLevel + 1}
      pageSize={internal.max}
      onPostClick={handlePostClick}
    />
  );
});
