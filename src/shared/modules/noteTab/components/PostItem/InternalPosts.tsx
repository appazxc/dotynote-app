import { useNavigate } from '@tanstack/react-router';
import React from 'react';

import { openTab } from 'shared/actions/space/openTab';
import { noteRoutePath } from 'shared/constants/noteRoutePath';
import { buildNoteTabRoute } from 'shared/helpers/buildNoteTabRoute';
import { StickTypeList } from 'shared/modules/noteTab/components/StickTypeList';
import { useAppDispatch } from 'shared/store/hooks';
import { PostEntity } from 'shared/types/entities/PostEntity';

type Props = {
  post: PostEntity;
  internalLevel: number;
};

export const InternalPosts = React.memo(({ post, internalLevel }: Props) => {
  const { note, internal } = post;

  return (
    <StickTypeList
      disablePagination
      pt="2"
      pb="0"
      noteId={note.id}
      // get sort and orderBy from post.internal.note.postSettings
      sort={note?.postsSettings?.sort}
      orderBy={note.postsSettings?.orderBy}
      internalLevel={internalLevel + 1}
      pageSize={internal.max}
    />
  );
});
