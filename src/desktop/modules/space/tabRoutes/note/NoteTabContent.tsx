import React from 'react';

import { Box, Container } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';

import { openTab } from 'shared/actions/space/openTab';
import { modalIds } from 'shared/constants/modalIds';
import { SelectConcretePlaceModal } from 'shared/containers/modals/SelectConcretePlaceModal';
import { showModal } from 'shared/modules/modal/modalSlice';
import { NoteBase } from 'shared/modules/space/tabRoutes/note/components/NoteBase';
import { Posts } from 'shared/modules/space/tabRoutes/note/components/Posts';
import { selectOperation } from 'shared/selectors/operations';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { updateOperationConcretePost } from 'shared/store/slices/appSlice';
import { PostEntity } from 'shared/types/entities/PostEntity';

import { buildTabHref } from 'desktop/modules/space/helpers/buildTabHref';

type Props = {
  noteId: number,
  isWriteMode: boolean,
  showPosts: boolean,
}

export const NoteTabContent = React.memo((props: Props) => {
  const { noteId, isWriteMode, showPosts } = props;
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
  
  const concretePostClick = React.useCallback((post: PostEntity) => {
    dispatch(updateOperationConcretePost(post.id));
    dispatch(showModal({ id: modalIds.selectConcretePlace }));
  }, [dispatch]);

  const onPostClick = React.useCallback((event: React.MouseEvent<HTMLDivElement>) => (post: PostEntity) => {
    event.preventDefault();
    if ('concretePlace' in operation && operation.concretePlace) {
      concretePostClick(post);
      return;
    }
    
    defaultPostClick(event, post.noteId);
  }, [operation, defaultPostClick, concretePostClick]);

  return (
    <Container h="full">
      <Box
        h="full"
        display="flex"
        flexDirection="column"
        gap="10"
      >
        <NoteBase
          id={noteId}
          isWriteMode={isWriteMode}
        />
        {showPosts && (
          <Posts
            key={noteId}
            noteId={noteId}
            onPostClick={onPostClick}
          />
        )}
      </Box>
      <SelectConcretePlaceModal noteId={noteId} />
    </Container>
  );
});