import { Box, Text } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { MdOutlineDone } from 'react-icons/md';

import { openTab } from 'shared/actions/space/openTab';
import { api } from 'shared/api';
import { usePinPost } from 'shared/api/hooks/usePinPost';
import { useRemovePosts } from 'shared/api/hooks/useRemovePosts';
import { useUnpinPost } from 'shared/api/hooks/useUnpinPost';
import { getPinnedPostsCountQueryKey } from 'shared/api/options/posts';
import { queryClient } from 'shared/api/queryClient';
import { Menu, MenuDivider, MenuItem, MenuList, MenuSub, MenuTrigger } from 'shared/components/Menu';
import { MenuItemProps } from 'shared/components/Menu/MenuItem';
import { MenuSubProps } from 'shared/components/Menu/MenuSub';
import { Switch } from 'shared/components/ui/switch';
import { toaster } from 'shared/components/ui/toaster';
import { modalIds } from 'shared/constants/modalIds';
import { buildNoteTabRoute } from 'shared/helpers/buildNoteTabRoute';
import { useBrowserNavigate } from 'shared/hooks/useBrowserNavigate';
import { useIsMobile } from 'shared/hooks/useIsMobile';
import { showModal } from 'shared/modules/modal/modalSlice';
import { selectUser } from 'shared/selectors/auth/selectUser';
import { userSelector } from 'shared/selectors/entities';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { startMoveOperation, startSelectOperation, startStickOperation } from 'shared/store/slices/appSlice';
import { PostEntity } from 'shared/types/entities/PostEntity';

type Props = {
  children: React.ReactNode,
  post: PostEntity,
  deleteNoteExtraId: string,
  internalLevel: number,
};

type Menu = { key: string, hasDivider?: boolean, menu?: Menu[] } & (MenuItemProps | MenuSubProps)

const internalMaxCounts = [0, 1, 3, 5, 10, 25, 50, 100];

export const PostWithMenu = React.memo(({ post, internalLevel, deleteNoteExtraId, children }: Props) => {
  const dispatch = useAppDispatch();
  const { id: postId, note: { id: noteId } } = post;
  const navigate = useBrowserNavigate();
  const isMobile = useIsMobile();
  const isInternal = internalLevel;
  const user = useAppSelector(selectUser);
  const isHubNote = user?.settings?.hubId === post.parent.id;

  const { mutate: remove } = useRemovePosts(postId);
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
  const { mutate: updateInternal } = useMutation({
    mutationFn: (max: number) => {
      return api.patch<string>(`/posts/${postId}/internal`, { max });
    },
    onError: () => {
      toaster.create({
        description: 'Failed to update internal posts',
        type: 'error',
      });
    },
  });

  const isInternalCreated = !!post.internal;

  const handleCreateOrDeleteInternal = React.useCallback(() => {
    if (isInternalCreated) {
      deleteInternalPosts(postId);
    } else {
      createInternalPosts(postId);
    }
  }, [isInternalCreated, postId, createInternalPosts, deleteInternalPosts]);

  const menuItems = React.useMemo(() => {
    const showPin = !isInternal && post.permissions.pin && !post.pinnedAt;
    const showUnpin = !isInternal && post.permissions.unpin && !!post.pinnedAt;
    const showSelect = !isInternal;
    const showStick = post.permissions.stick;
    const showMove = post.permissions.move;
    const showInternal = !isInternal && post.permissions.updateInternal && post.parent.postsSettings?.internal;
    const showRemove = post.permissions.remove && !isHubNote;
    const showDelete = post.permissions.delete;

    return [
      {
        key: 'Open in new tab',
        label: 'Open in new tab',
        onClick: () => {
          dispatch(openTab({ 
            route: buildNoteTabRoute(noteId),
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
            queryClient.invalidateQueries({ queryKey: getPinnedPostsCountQueryKey(post.parent.id) });
          },
        }),
      }] : [],
      ...showUnpin ? [{
        key: 'Unpin',
        label: 'Unpin',
        onClick: () => unpin(postId, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getPinnedPostsCountQueryKey(post.parent.id) });
          },
        }),
      }] : [],
      ...showSelect ? [{
        key: 'Select',
        label: 'Select',
        onClick: () => dispatch(startSelectOperation({
          noteId: post.parent.id,
          postId: post.id,
        })),
      }] : [],
      ...showStick ? [{
        key: 'Stick to',
        label: 'Stick to',
        onClick: () => dispatch(startStickOperation({
          fromNoteId: post.parent.id,
          postIds: [post.id],
        })),
      }] : [],
      ...showMove ? [{
        key: 'Move to',
        label: 'Move to',
        onClick: () => dispatch(startMoveOperation({
          fromNoteId: post.parent.id,
          postIds: [post.id],
        })),
      }] : [],
      ...showInternal ? [{
        key: 'Internal posts',
        label: 'Internal posts',
        menu: [
          {
            key: isInternalCreated ? 'Shown' : 'Hidden',
            label: <>
              {isInternalCreated ? 'Shown' : 'Hidden'}
              <Switch
                size="sm"
                checked={!!post.internal}
                disabled={isCreatingInternal || isDeletingInternal}
              />
            </>,
            closeOnClick: false,
            onClick: handleCreateOrDeleteInternal,
            justifyContent: 'space-between',
          },
          ...isInternalCreated ? [{
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
                  {post.internal.max}
                </Text>)
              </Text>
            ),
            menu: internalMaxCounts.map((count) => {
              return ({
                key: count,
                label: count,
                rightIcon: count === post.internal.max ? <MdOutlineDone /> : undefined,
                onClick: () => updateInternal(count),
              });
            }),
          }] : [],
        ],
      }] : [],
      ...showRemove ? [{
        key: 'Remove',
        label: 'Remove',
        onClick: () => remove(),
        hasDivider: true,
      }] : [],
      ...showDelete ? [{
        key: 'Delete',
        label: 'Delete',
        onClick: () => dispatch(showModal({ id: modalIds.confirm, extraId: deleteNoteExtraId })),
        hasDivider: !showRemove,
      }] : [],
    ] as Menu[];
  }, [
    post,
    deleteNoteExtraId,
    dispatch,
    isCreatingInternal,
    isDeletingInternal,
    isInternal,
    isInternalCreated,
    isMobile,
    navigate,
    noteId,
    pin,
    postId,
    isHubNote,
    remove,
    unpin,
    updateInternal,
    handleCreateOrDeleteInternal,
  ]);

  const renderMenuItem = React.useCallback(({ key, menu, hasDivider, ...restProps } : Menu) => {
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
    <Box>
      <Menu isContextMenu>
        <MenuTrigger>
          {children}
        </MenuTrigger>
        <MenuList>
          {menuItems.map(renderMenuItem)}
        </MenuList>
      </Menu>
    </Box>
  );
});
