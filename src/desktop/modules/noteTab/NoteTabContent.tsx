import React from 'react';

import { Box, Container } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';

import { openTab } from 'shared/actions/space/openTab';
import { modalIds } from 'shared/constants/modalIds';
import { SelectConcretePlaceModal } from 'shared/containers/modals/SelectConcretePlaceModal';
import { showModal } from 'shared/modules/modal/modalSlice';
import { NoteBase } from 'shared/modules/noteTab/components/NoteBase';
import { Posts } from 'shared/modules/noteTab/components/Posts';
import { selectOperation } from 'shared/selectors/operations';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { updateOperationConcretePost } from 'shared/store/slices/appSlice';
import { NoteEntity } from 'shared/types/entities/NoteEntity';
import { ApiPostEntity } from 'shared/types/entities/PostEntity';

import { buildTabHref } from 'desktop/modules/space/helpers/buildTabHref';

type Props = {
  note: NoteEntity,
  isWriteMode: boolean,
  isSearchActive: boolean,
  search: string,
}

export const NoteTabContent = React.memo((props: Props) => {
  const { note, isWriteMode, isSearchActive, search } = props;
  const { id: noteId, settings, postsSettings } = note;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const operation = useAppSelector(selectOperation);

  const defaultPostClick = React.useCallback((event: React.MouseEvent<HTMLDivElement>, noteId: number) => {
    if (event.metaKey) {
      dispatch(openTab({ 
        route: buildTabHref({ to: '/n/$noteId', params: { noteId: String(noteId) } }),
      }));
    } else {
      navigate({ to: '/n/$noteId', params: { noteId } });
    }
  }, [navigate, dispatch]);
  
  const concretePostClick = React.useCallback((post: ApiPostEntity) => {
    dispatch(updateOperationConcretePost(post.id));
    dispatch(showModal({ id: modalIds.selectConcretePlace }));
  }, [dispatch]);

  const onPostClick = React.useCallback((event: React.MouseEvent<HTMLDivElement>) => (post: ApiPostEntity) => {
    event.preventDefault();
    if ('concretePlace' in operation && operation.concretePlace) {
      concretePostClick(post);
      return;
    }
    
    defaultPostClick(event, post.note);
  }, [operation, defaultPostClick, concretePostClick]);

  const showPosts = !!postsSettings;
  const showNote = (!isSearchActive && settings?.display !== false) || !showPosts;

  return (
    <Container h="full">
      <Box
        h="full"
        display="flex"
        flexDirection="column"
        gap="10"
      >
        {showNote && (
          <NoteBase
            id={noteId}
            isWriteMode={isWriteMode}
          />
        )}
        {showPosts && (
          <Posts
            key={noteId}
            noteId={noteId}
            search={search}
            onPostClick={onPostClick}
          />
        )}
      </Box>
      <SelectConcretePlaceModal noteId={noteId} />
    </Container>
  );
});