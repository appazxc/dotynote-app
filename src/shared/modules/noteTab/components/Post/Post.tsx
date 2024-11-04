import React from 'react';

import { Box, Text, Switch } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

import { openTab } from 'shared/actions/space/openTab';
import { api } from 'shared/api';
import { useDeleteNotes } from 'shared/api/hooks/useDeleteNotes';
import { usePinPost } from 'shared/api/hooks/usePinPost';
import { useRemovePosts } from 'shared/api/hooks/useRemovePosts';
import { useUnpinPost } from 'shared/api/hooks/useUnpinPost';
import { getPinnedPostsCountQueryKey } from 'shared/api/options/posts';
import { queryClient } from 'shared/api/queryClient';
import { Menu, MenuDivider, MenuItem, MenuList, MenuSub, MenuTrigger } from 'shared/components/Menu';
import { Post as PostComponent } from 'shared/components/Post';
import { modalIds } from 'shared/constants/modalIds';
import { ConfirmModal } from 'shared/containers/modals/ConfirmModal';
import { buildNoteTabRoute } from 'shared/helpers/buildNoteTabRoute';
import { useBrowserNavigate } from 'shared/hooks/useBrowserNavigate';
import { useIsMobile } from 'shared/hooks/useIsMobile';
import { hideModal, showModal } from 'shared/modules/modal/modalSlice';
import { noteSelector, postSelector } from 'shared/selectors/entities';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { startMoveOperation, startSelectOperation, startStickOperation } from 'shared/store/slices/appSlice';
import { PostEntity } from 'shared/types/entities/PostEntity';
import { invariant } from 'shared/util/invariant';

type Props = {
  postId: number,
  isSelecting?: boolean,
  isSelected?: boolean,
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => (post: PostEntity) => void,
  onDelete: () => void,
}

export const Post = React.memo((props: Props) => {
  const { postId, onClick, onDelete, isSelecting, isSelected } = props;
  const getByIdPost = React.useMemo(() => postSelector.makeGetEntityById(), []);
  const getByIdNote = React.useMemo(() => noteSelector.makeGetEntityById(), []);
  const post = useAppSelector(state => getByIdPost(state, postId));
  const note = useAppSelector(state => getByIdNote(state, post?.note.id));
  const dispatch = useAppDispatch();
  const navigate = useBrowserNavigate();
  const isMobile = useIsMobile();

  invariant(post, 'Missing post', { id: postId });
  invariant(note, 'Missing note');

  const { mutate: remove } = useRemovePosts(postId);
  const { mutate: deleteNote } = useDeleteNotes(note.id);
  const { mutate: pin } = usePinPost();
  const { mutate: unpin } = useUnpinPost();
  const { mutate: createInternalPosts, isPending: isCreatingInternal } = useMutation({
    mutationFn: (postId: number) => {
      return api.post<string>(`/posts/${postId}/internal`, {});
    },
  });
  const { mutate: deleteInternalPosts, isPending: isDeletingInternal } = useMutation({
    mutationFn: (postId: number) => {
      return api.delete<string>(`/posts/${postId}/internal`);
    },
  });

  const isInternalCreated = !!post.internal;
  
  React.useEffect(() => {
    if ((post._isDeleted || note._isDeleted) && onDelete) {
      onDelete();
    }
  }, [post._isDeleted, note._isDeleted, onDelete]);
      
  const handleCreateOrDeleteInternal = React.useCallback(() => {
    if (isInternalCreated) {
      deleteInternalPosts(postId);
    } else {
      createInternalPosts(postId);
    }
    
  }, [isInternalCreated, postId, createInternalPosts, deleteInternalPosts]);

  const renderedPost = React.useMemo(() => {
    if (post._isDeleted) {
      return null;
    }

    return (
      <PostComponent
        isSelecting={isSelecting}
        isSelected={isSelected}
        isPinned={!!post.pinnedAt}
        noteId={note.id}
        onClick={(event: React.MouseEvent<HTMLDivElement>) => {
          onClick?.(event)(post);
        }}
      />
    );
  }, [isSelecting, isSelected, note.id, onClick, post]);

  if (post._isDeleted) {
    return null;
  }

  const deleteNoteExtraId = `deleteNote${note.id}`;
  
  return (
    isSelecting ? renderedPost : (
      <>
        <Menu isContextMenu>
          <MenuTrigger>
            {renderedPost}
          </MenuTrigger>
          <MenuList>
            <MenuItem
              label="Open in new tab"
              onClick={() => {
                dispatch(openTab({ 
                  route: buildNoteTabRoute(note.id),
                  active: true,
                }));

                if (isMobile) {
                  navigate({ to: '/app' });
                }
              }}
            />
            {post.permissions.pin && !post.pinnedAt && (
              <MenuItem
                label="Pin"
                onClick={() => pin(postId, {
                  onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: getPinnedPostsCountQueryKey(post.parent.id) });
                  },
                })}
              />
            )}
            {post.permissions.unpin && !!post.pinnedAt && (
              <MenuItem
                label="Unpin"
                onClick={() => unpin(postId, {
                  onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: getPinnedPostsCountQueryKey(post.parent.id) });
                  },
                })}
              />
            )}
            <MenuItem
              label="Select"
              onClick={() => dispatch(startSelectOperation({
                noteId: post.parent.id,
                postId: post.id,
              }))}
            />
            {post.permissions.stick && (
              <MenuItem
                label="Stick"
                onClick={() => dispatch(startStickOperation({
                  fromNoteId: post.parent.id,
                  postIds: [post.id],
                }))}
              />
            )}
            {post.permissions.move && (
              <MenuItem
                label="Move"
                onClick={() => dispatch(startMoveOperation({
                  fromNoteId: post.parent.id,
                  postIds: [post.id],
                }))}
              />
            )}
            {post.permissions.updateInternal && note?.postsSettings?.internal && (
              <MenuSub label="Internal posts">
                <Box
                  p="1"
                  bg="blue.200"
                  display="flex"
                  justifyContent="space-between"
                  minW="140px"
                  alignItems="center"
                >
                  <Text fontSize="medium">{isInternalCreated ? 'On' : 'Off'}</Text>
                  <Switch
                    isChecked={!!post.internal}
                    isDisabled={isCreatingInternal || isDeletingInternal}
                    onChange={handleCreateOrDeleteInternal}
                  />
                </Box>
              </MenuSub>
            )}

            {(post.permissions.delete || post.permissions.remove) && (
              <>
                <MenuDivider />
                {post.permissions.remove && (
                  <MenuItem label="Remove" onClick={() => remove()} />
                )}
                <MenuItem 
                  // colorScheme="red"
                  label="Delete"
                  onClick={() => { dispatch(showModal({ id: modalIds.confirm, extraId: deleteNoteExtraId })); }}
                />
              </>
            )}
          </MenuList>
        </Menu>
        <ConfirmModal
          title="This action can't be undone"
          description="Delete selected note?"
          confirmText="Delete"
          extraId={deleteNoteExtraId}
          onConfirm={() => {
            dispatch(hideModal());
            deleteNote();
          }}
        />
      </>
    )
  );
});
