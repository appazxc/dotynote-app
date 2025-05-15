import React from 'react';

import { NotePosts } from 'shared/modules/noteTab/components/NotePosts';
import { PostEntity } from 'shared/types/entities/PostEntity';

type Props = {
  post: PostEntity;
  internalLevel: number;
};

export const InternalPosts = React.memo(({ post, internalLevel }: Props) => {
  const { note, internal } = post;

  return (
    <NotePosts
      disablePagination
      note={note}
      pageSize={internal.max}
      internalLevel={internalLevel + 1}
    />
  );
});
