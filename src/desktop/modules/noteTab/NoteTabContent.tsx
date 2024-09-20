import React from 'react';

import { Box, Container } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';

import { openTab } from 'shared/actions/space/openTab';
import { EMPTY_ARRAY } from 'shared/constants/common';
import { modalIds } from 'shared/constants/modalIds';
import { SelectConcretePlaceModal } from 'shared/containers/modals/SelectConcretePlaceModal';
import { showModal } from 'shared/modules/modal/modalSlice';
import { NoteBase } from 'shared/modules/noteTab/components/NoteBase';
import { PostList } from 'shared/modules/noteTab/components/PostList';
import { selectOperation } from 'shared/selectors/operations';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { operationTypes, updateOperationConcretePost } from 'shared/store/slices/appSlice';
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
  const showPosts = !!postsSettings;
  const showNote = (!isSearchActive && !settings?.hide) || !showPosts;
  const isSelecting = operation.type === operationTypes.SELECT && operation.noteId === noteId;
  const selectedPosts = operation.type === operationTypes.SELECT ? operation.postIds : EMPTY_ARRAY;
  
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
          <PostList
            key={noteId}
            noteId={noteId}
            search={search}
            isSelecting={isSelecting}
            selectedPosts={selectedPosts}
            sort={postsSettings.sort}
            orderBy={postsSettings.orderById}
            onPostClick={onPostClick}
          />
        )}
      </Box>
      <SelectConcretePlaceModal noteId={noteId} />
    </Container>
  );
});