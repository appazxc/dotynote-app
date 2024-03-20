import React from 'react';

import { Box, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { openTab } from 'shared/actions/space/openTab';
import { EditorView } from 'shared/modules/editor';
import { tabRouteNames } from 'shared/modules/space/constants/tabRouteNames';
import { buildTabUrl } from 'shared/modules/space/util/buildTabUrl';
import { noteSelector, postSelector } from 'shared/selectors/entities';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { IdentityType } from 'shared/types/entities/BaseEntity';
import { invariant } from 'shared/util/invariant';

type Props = {
  postId: IdentityType,
  className: string,
}

export const Post = React.memo(({ postId, className }: Props) => {
  const dispatch = useAppDispatch();
  const post = useAppSelector(state => postSelector.getById(state, postId));
  const note = useAppSelector(state => noteSelector.getById(state, post?.noteId));

  invariant(note, 'Missing note');
  invariant(post, 'Missing post');

  return (
    <Box>
      <Link
        to={buildTabUrl({ routeName: tabRouteNames.note, pathParams: { noteId: note.id } })}
        onClick={(e) => {
          if (e.metaKey) {
            e.preventDefault();
            dispatch(openTab({ 
              route: buildTabUrl({ routeName: tabRouteNames.note, pathParams: { noteId: note.id } }),
            }));
          }
        }}
      >
        <Box
          className={className}
          p="4"
          borderWidth="2px"
          borderRadius="lg"
          borderColor="slateDark.7"
          cursor="pointer"
          data-post-id={postId}
          
        >
          <Text fontWeight="500">#{post.id} {note.title}</Text>
          <EditorView removeEmptyDivsFromEnd content={note.content} />
        </Box>
      </Link>
    </Box>
  );
});
