import React from 'react';

import { NotePosts } from 'shared/modules/noteTab/components/NotePosts';
import { PostEntity } from 'shared/types/entities/PostEntity';

type Props = {
  post: PostEntity;
  nestedLevel?: number;
};

export const NestedPosts = React.memo(({ post, nestedLevel = 0 }: Props) => {
  const { note, nested } = post;

  return (
    <NotePosts
      disablePagination
      note={note}
      pageSize={nested.max}
      internalLevel={nestedLevel + 1}
    />
  );
});
