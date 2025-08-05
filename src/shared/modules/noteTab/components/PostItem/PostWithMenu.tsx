import { Text } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { MdOutlineDone } from 'react-icons/md';

import { openTab } from 'shared/actions/space/openTab';
import { api } from 'shared/api';
import { useDeleteNotesFromPosts } from 'shared/api/hooks/useDeleteNotesFromPosts';
import { usePinPost } from 'shared/api/hooks/usePinPost';
import { useUnpinPost } from 'shared/api/hooks/useUnpinPost';
import { useUnstickPosts } from 'shared/api/hooks/useUnstickPosts';
import { getPinnedPostsCountQueryKey } from 'shared/api/options/posts';
import { queryClient } from 'shared/api/queryClient';
import { Menu, MenuDivider, MenuItem, MenuList, MenuSub, MenuTrigger } from 'shared/components/Menu';
import { MenuItemProps } from 'shared/components/Menu/MenuItem';
import { MenuSubProps } from 'shared/components/Menu/MenuSub';
import { Switch } from 'shared/components/ui/switch';
import { toaster } from 'shared/components/ui/toaster';
import { modalIds } from 'shared/constants/modalIds';
import { ConfirmModal } from 'shared/containers/modals/ConfirmModal';
import { buildNoteTabRoute } from 'shared/helpers/buildNoteTabRoute';
import { useBrowserNavigate } from 'shared/hooks/useBrowserNavigate';
import { useIsMobile } from 'shared/hooks/useIsMobile';
import { hideModal, showModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';
import { startMoveOperation, startSelectOperation, startStickOperation } from 'shared/store/slices/appSlice';
import { PostEntity } from 'shared/types/entities/PostEntity';

type Props = {
  children: React.ReactNode;
  post: PostEntity;
  parentId: string;
  nestedLevel?: number;
  isMenuDisabled?: boolean;
  canShowNested?: boolean;
};

type MenuProps = { key: string; hasDivider?: boolean; menu?: MenuProps[] } & (MenuItemProps | MenuSubProps)

const nestedMaxCounts = [0, 1, 3, 5, 10, 25, 50, 100];

export const PostWithMenu = React.memo((props: Props) => {
  const { post, parentId, nestedLevel, isMenuDisabled, canShowNested, children } = props;
  const { id: postId, note: { id: noteId } } = post;
  const dispatch = useAppDispatch();
  const navigate = useBrowserNavigate();
  const isMobile = useIsMobile();
  const isNested = !!nestedLevel;

  const { mutate: deletePosts, isPending: isDeletePending } = useDeleteNotesFromPosts(parentId);
  const { mutate: unstick } = useUnstickPosts(parentId, [postId]);
  const { mutate: pin } = usePinPost();
  const { mutate: unpin } = useUnpinPost();
  const { mutate: createNestedPosts, isPending: isCreatingNested } = useMutation({
    mutationFn: (postId: string) => {
      return api.post<string>(`/posts/${postId}/nested`, {});
    },
  });
  const { mutate: deleteNestedPosts, isPending: isDeletingNested } = useMutation({
    mutationFn: (postId: string) => {
      return api.delete<string>(`/posts/${postId}/nested`);
    },
  });
  const { mutate: updateNested } = useMutation({
    mutationFn: (max: number) => {
      return api.patch<string>(`/posts/${postId}/nested`, { max });
    },
    onError: () => {
      toaster.create({
        description: 'Failed to update nested posts',
        type: 'error',
      });
    },
  });
  
  const isNestedCreated = !!post.nested;

  const handleCreateOrDeleteNested = React.useCallback(() => {
    if (isNestedCreated) {
      deleteNestedPosts(postId);
    } else {
      createNestedPosts(postId);
    }
  }, [isNestedCreated, postId, createNestedPosts, deleteNestedPosts]);

  const menuItems = React.useMemo(() => {
    const showPin = !isNested && post.permissions.pin && !post.pinnedAt;
    const showUnpin = !isNested && post.permissions.unpin && !!post.pinnedAt;
    const showSelect = !isNested;
    const showStick = post.permissions.stick;
    const showMove = post.permissions.move;
    const showNested = !isNested && post.permissions.updateNested && canShowNested;
    const showUnstick = post.permissions.unstick;
    const showDelete = post.permissions.delete;

    return [
      {
        key: 'Open in new tab',
        label: 'Open in new tab',
        onClick: () => {
          dispatch(openTab({ 
            path: buildNoteTabRoute(noteId, { parent: noteId }),
            active: true,
          }));

          if (isMobile) {
            navigate({ to: '/app' });
          }
        },
      },
      ...showPin ? [{
        key: 'Pin',
        label: 'Pin',
        onClick: () => pin(postId, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getPinnedPostsCountQueryKey(parentId) });
          },
        }),
      }] : [],
      ...showUnpin ? [{
        key: 'Unpin',
        label: 'Unpin',
        onClick: () => unpin(postId, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getPinnedPostsCountQueryKey(parentId) });
          },
        }),
      }] : [],
      ...showSelect ? [{
        key: 'Select',
        label: 'Select',
        onClick: () => dispatch(startSelectOperation({
          parentId: parentId,
          postId: post.id,
        })),
      }] : [],
      ...showStick ? [{
        key: 'Stick',
        label: 'Stick',
        onClick: () => dispatch(startStickOperation({
          fromNoteId: parentId,
          postIds: [post.id],
        })),
      }] : [],
      ...showMove ? [{
        key: 'Move',
        label: 'Move',
        onClick: () => dispatch(startMoveOperation({
          fromNoteId: parentId,
          postIds: [post.id],
        })),
      }] : [],
      ...showNested ? [{
        key: 'Nested posts',
        label: 'Nested posts',
        menu: [
          {
            key: isNestedCreated ? 'Shown' : 'Hidden',
            label: <>
              {isNestedCreated ? 'Shown' : 'Hidden'}
              <Switch
                size="sm"
                checked={!!post.nested}
                disabled={isCreatingNested || isDeletingNested}
              />
            </>,
            closeOnClick: false,
            onClick: handleCreateOrDeleteNested,
            justifyContent: 'space-between',
          },
          ...isNestedCreated ? [{
            key: 'Max',
            label: (
              <Text
                whiteSpace="nowrap"
                display="inline"
                as="span"
              >
                  Max (
                <Text
                  color="gray.500"
                  display="inline"
                  as="span"
                >
                  {post.nested.max}
                </Text>)
              </Text>
            ),
            menu: nestedMaxCounts.map((count) => {
              return ({
                key: count,
                label: count,
                rightIcon: count === post.nested.max ? <MdOutlineDone /> : undefined,
                onClick: () => updateNested(count),
              });
            }),
          }] : [],
        ],
      }] : [],
      ...showUnstick ? [{
        key: 'Unstick',
        label: 'Unstick',
        onClick: () => unstick(),
        hasDivider: true,
      }] : [],
      ...showDelete ? [{
        key: 'Delete',
        label: 'Delete',
        disabled: isDeletePending,
        onClick: () => dispatch(showModal({ id: modalIds.confirm, extraId: post.id })),
        hasDivider: !showUnstick,
      }] : [],
    ] as MenuProps[];
  }, [
    post,
    dispatch,
    isCreatingNested,
    isDeletingNested,
    isNested,
    isNestedCreated,
    isMobile,
    navigate,
    noteId,
    pin,
    postId,
    unstick,
    unpin,
    updateNested,
    handleCreateOrDeleteNested,
    isDeletePending,
    parentId,
    canShowNested,
  ]);

  const renderMenuItem = React.useCallback(({ key, menu, hasDivider, ...restProps } : MenuProps) => {
    const Component = menu ? MenuSub : MenuItem;
    const children = menu ? menu.map(renderMenuItem) : undefined;
    
    return (
      <React.Fragment key={key}>
        {hasDivider && <MenuDivider />}
        <Component {...restProps}>{children}</Component>
      </React.Fragment>
    );
  }, []);

  return (
    <>
      <Menu isContextMenu enabled={!isMenuDisabled}>
        <MenuTrigger>
          {children}
        </MenuTrigger>
        <MenuList>
          {menuItems.map(renderMenuItem)}
        </MenuList>
      </Menu>
      <ConfirmModal
        title="This action can't be undone"
        description="Delete selected note?"
        confirmText="Delete"
        extraId={post.id}
        onConfirm={() => {
          dispatch(hideModal());
          deletePosts([post.id]);
        }}
      />
    </>
  );
});
