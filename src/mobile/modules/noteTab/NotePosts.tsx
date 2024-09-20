import React from 'react';

import { useNavigate } from '@tanstack/react-router';

import { modalIds } from 'shared/constants/modalIds';
import { showModal } from 'shared/modules/modal/modalSlice';
import { PostList } from 'shared/modules/noteTab/components/PostList';
import { selectOperation } from 'shared/selectors/operations';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { updateOperationConcretePost } from 'shared/store/slices/appSlice';
import { NoteEntity } from 'shared/types/entities/NoteEntity';
import { ApiPostEntity } from 'shared/types/entities/PostEntity';

type Props = {
  note: NoteEntity,
  search: string,
};

export const NotePosts = React.memo((props: Props) => {
  const { note, search } = props;
  const { id: noteId, postsSettings } = note;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const operation = useAppSelector(selectOperation);

  const defaultPostClick = React.useCallback((_event: React.MouseEvent<HTMLDivElement>, noteId: number) => {
    navigate({ to: '/n/$noteId', params: { noteId } });
  }, [navigate]);
  
  const concretePostClick = React.useCallback((post: ApiPostEntity) => {
    dispatch(updateOperationConcretePost(post.id));
    dispatch(showModal({ id: modalIds.selectConcretePlace }));
  }, [dispatch]);

  const handlePostClick = React.useCallback((event: React.MouseEvent<HTMLDivElement>) => (post: ApiPostEntity) => {
    event.preventDefault();
    if ('concretePlace' in operation && operation.concretePlace) {
      concretePostClick(post);
      return;
    }
    
    defaultPostClick(event, post.note);
  }, [operation, defaultPostClick, concretePostClick]);

  const showPosts = !!postsSettings;
  
  if (!showPosts) {
    return null;
  }

  return (
    <PostList
      noteId={noteId}
      search={search}
      onPostClick={handlePostClick}
    />
  );
});
