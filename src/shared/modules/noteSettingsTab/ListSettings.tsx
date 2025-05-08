import { Box, Card } from '@chakra-ui/react';
import React from 'react';

import { useUpdatePostsSettings } from 'shared/api/hooks/useUpdatePostsSettings';
import { Select } from 'shared/components/ui/select';
import { DirectionSelect } from 'shared/modules/noteSettingsTab/DirectionSelect';
import { Filters } from 'shared/modules/noteSettingsTab/Filters';
import { PostsSettingsEntity } from 'shared/types/entities/PostsSettingsEntity';

type Props = {
  postsSettings: PostsSettingsEntity;
};

const listTypeOptions = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Sticked posts',
    value: 'stick',
  },
];

const orderByOptions = [
  {
    label: 'Personalized',
    value: 'position',
  },
  {
    label: 'Date created',
    value: 'createdAt',
  },
  {
    label: 'Date updated',
    value: 'updatedAt',
  },
];

export const ListSettings = React.memo(({ postsSettings }: Props) => {
  const { mutateAsync } = useUpdatePostsSettings(postsSettings.noteId, postsSettings.id);
  
  const handleOrderByChange = React.useCallback(async (values) => {
    await mutateAsync({
      orderBy: values[0],
    });
  }, [mutateAsync]);

  const handleListTypeChange = React.useCallback(async (values) => {
    await mutateAsync({
      listType: values[0],
    });
  }, [mutateAsync]);

  const handleSortChange = React.useCallback(async (value: PostsSettingsEntity['sort']) => {
    await mutateAsync({
      sort: value,
    });
  }, [mutateAsync]);

  return (
    <Card.Root
      p="4"
      gap="3"
    >
      <Box
        display="flex"
        gap="3"
        flexDirection="row"
        alignItems="flex-end"
      >
        <Select
          size="sm"
          label="List type"
          value={[postsSettings.listType]}
          w="200px"
          options={listTypeOptions}
          onChange={handleListTypeChange}
        />
        {postsSettings.listType === 'all' && <Filters /> }
      </Box>
      <Box
        display="flex"
        gap="3"
        flexDirection="row"
        alignItems="flex-end"
      >
        <Select
          size="sm"
          label="Order by"
          value={[postsSettings.orderBy]}
          w="200px"
          options={orderByOptions}
          onChange={handleOrderByChange}
        />
        <DirectionSelect value={postsSettings.sort} onChange={handleSortChange} />
      </Box>
    </Card.Root>
  );
});
