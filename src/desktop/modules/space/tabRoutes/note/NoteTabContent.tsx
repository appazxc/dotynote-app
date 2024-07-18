import React from 'react';

import { Box, Container } from '@chakra-ui/react';
// import { useScrollContext } from 'shared/components/ScrollProvider';
import { useNavigate } from '@tanstack/react-router';

import { openTab } from 'shared/actions/space/openTab';
import { Posts } from 'shared/modules/space/tabRoutes/note/containers/Posts';
import { useAppDispatch } from 'shared/store/hooks';

import { buildTabHref } from '../../helpers/buildTabHref';

import { NoteBase } from './components/NoteBase';

type Props = {
  noteId: string,
  isWriteMode: boolean,
  showPosts: boolean,
}

export const NoteTabContent = React.memo((props: Props) => {
  const { noteId, isWriteMode, showPosts } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const scrollRef = useScrollContext();

  // React.useEffect(() => {
  //   if (scrollRef?.current) {
  //     scrollRef.current.scrollTo(0, 0);
  //   }
  // }, [noteId, scrollRef]);
  
  const onPostClick = React.useCallback((e) => (noteId: string) => {
    e.preventDefault();
    if (e.metaKey) {
      dispatch(openTab({ 
        route: buildTabHref({ to: '/n/$noteId', params: { noteId: String(noteId) } }),
      }));
    } else {
      navigate({ to: '/n/$noteId', params: { noteId } });
    }
  }, [navigate, dispatch]);

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
    </Container>
  );
});