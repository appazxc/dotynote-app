import { Box, Center, Stack, Tabs, Text } from '@chakra-ui/react';
import React from 'react';

import { apos } from 'shared/constants/htmlCodes';
import { NoteContentPicker } from 'shared/modules/noteTab/components/ContentPicker/NoteContentPicker';
import { PostsContentPicker } from 'shared/modules/noteTab/components/ContentPicker/PostsContentPicker';
import { addTo, AddTo } from 'shared/modules/noteTab/constants';
import { selectIsMobile } from 'shared/selectors/app/selectIsMobile';
import { noteSelector } from 'shared/selectors/entities';
import { selectAddTo } from 'shared/selectors/user/selectAddTo';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { updateAddTo } from 'shared/store/slices/appSlice';
import { invariant } from 'shared/util/invariant';

type Props = {
  noteId: string;
  canAddToNote: boolean;
  canAddToPosts: boolean;
  type?: 'tabs' | 'sections';
  view?: 'grid' | 'list' | 'row';
  onClose: () => void;
};

export const ContentPicker = React.memo((props: Props) => {
  const { noteId, canAddToNote, canAddToPosts, type = 'tabs', view = 'grid', onClose } = props;
  const dispatch = useAppDispatch();
  const addToState = useAppSelector(state => selectAddTo(state, { noteId }));
  const note = useAppSelector(state => noteSelector.getEntityById(state, noteId));
  const isMobile = useAppSelector(selectIsMobile);

  invariant(note, 'Missing note');

  if (!addToState) {
    return (
      <Center>
        <Text>Can{apos}t add any content</Text>
      </Center>
    );
  }

  if (type === 'tabs') {
    return (
      <Tabs.Root
        lazyMount
        value={addToState}
        size="sm"
        variant="subtle"
        css={{
          '--tabs-height': 'var(--chakra-sizes-8)',
        }}
        onValueChange={(e) => dispatch(updateAddTo(e.value as AddTo))}
      >
        <Box
          display="flex"
          alignItems="center"
          gap={2}
        >
          <Text fontSize="md" fontWeight="500">Create</Text> 
          <Tabs.List alignItems="center">
            {canAddToNote && (
              <Tabs.Trigger
                value={addTo.NOTE}
                h="6"
                fontWeight="600"
              >
                Note
              </Tabs.Trigger>
            )}
            {canAddToPosts && (
              <Tabs.Trigger
                value={addTo.POSTS}
                h="6"
                fontWeight="600"
              >
                Post
              </Tabs.Trigger>
            )}
          </Tabs.List>
        </Box>

        {canAddToNote && (
          <Tabs.Content value={addTo.NOTE} pt={isMobile ? '2' : undefined}>
            <NoteContentPicker
              noteId={noteId}
              view={view}
              onClick={onClose}
            />
          </Tabs.Content>
        )}
        {canAddToPosts && (
          <Tabs.Content value={addTo.POSTS} pt={isMobile ? '2' : undefined}>
            <PostsContentPicker
              note={note}
              view={view}
              onClick={onClose}
            />
          </Tabs.Content>
        )}
      </Tabs.Root>
    );
  }

  return (
    <Stack>
      {canAddToNote && (
        <Stack>
          <Text
            fontSize="xs"
            fontWeight="600"
            color="fg.subtle"
            textTransform="uppercase"
          >
          Attach to note
          </Text> 

          {canAddToNote && (
            <NoteContentPicker
              noteId={noteId}
              view={view}
              onClick={onClose}
            />
          )}
        </Stack>
      )}

      {canAddToPosts && (
        <Stack>
          <Text
            fontSize="xs"
            fontWeight="600"
            color="fg.subtle"
            textTransform="uppercase"
          >
          Create post
          </Text> 
          {canAddToPosts && (
            <PostsContentPicker
              note={note}
              view={view}
              onClick={onClose}
            />
          )}
        </Stack>
      )}
    </Stack>
  );
});
