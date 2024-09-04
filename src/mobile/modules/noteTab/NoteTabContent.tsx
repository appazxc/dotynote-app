import React from 'react';

import { Container, Stack } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';

import { openTab } from 'shared/actions/space/openTab';
import { useBrowserRouter } from 'shared/components/BrowserRouterProvider';
import { modalIds } from 'shared/constants/modalIds';
import { SelectConcretePlaceModal } from 'shared/containers/modals/SelectConcretePlaceModal';
import { showModal } from 'shared/modules/modal/modalSlice';
import { NoteBase } from 'shared/modules/noteTab/components/NoteBase';
import { Posts } from 'shared/modules/noteTab/components/Posts';
import { selectOperation } from 'shared/selectors/operations';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { updateOperationConcretePost } from 'shared/store/slices/appSlice';
import { PostEntity } from 'shared/types/entities/PostEntity';

import { buildTabHref } from 'mobile/modules/space/helpers/buildTabHref';

type Props = {
  noteId: number,
  showPosts: boolean,
  isWriteMode: boolean,
  isPrimary?: boolean,
  hideNote: boolean,
  search: string,
}

export const NoteTabContent = (props: Props) => {
  const { noteId, showPosts, isWriteMode, isPrimary, search, hideNote } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const operation = useAppSelector(selectOperation);
  const { navigate: browserNavigate } = useBrowserRouter();

  const defaultPostClick = React.useCallback((event: React.MouseEvent<HTMLDivElement>, noteId: number) => {
    if (event.metaKey || isPrimary) {
      dispatch(openTab({ 
        route: buildTabHref({ to: '/n/$noteId', params: { noteId: String(noteId) } }),
        makeActive: true,
      }));
      browserNavigate({ to: '/app' });
    } else {
      navigate({ to: '/n/$noteId', params: { noteId } });
    }
  }, [navigate, browserNavigate, isPrimary, dispatch]);
  
  const concretePostClick = React.useCallback((post: PostEntity) => {
    dispatch(updateOperationConcretePost(post.id));
    dispatch(showModal({ id: modalIds.selectConcretePlace }));
  }, [dispatch]);

  const handlePostClick = React.useCallback((event: React.MouseEvent<HTMLDivElement>) => (post: PostEntity) => {
    event.preventDefault();
    if ('concretePlace' in operation && operation.concretePlace) {
      concretePostClick(post);
      return;
    }
    
    defaultPostClick(event, post.noteId);
  }, [operation, defaultPostClick, concretePostClick]);

  return (
    <Container h="full">
      <Stack
        gap="5"
        pt="3"
        h="full"
      >
        {!hideNote && (
          <NoteBase
            key={noteId}
            isMobile
            id={noteId}
            isWriteMode={isWriteMode}
          />
        )}
        {showPosts && (
          <Posts
            noteId={noteId}
            search={search}
            scrollRestoration={!isPrimary}
            onPostClick={handlePostClick}
          />
        )}
      </Stack>
      <SelectConcretePlaceModal noteId={noteId} />
    </Container>
  );
};