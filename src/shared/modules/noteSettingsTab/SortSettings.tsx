import { Box, Card, Heading } from '@chakra-ui/react';
import React from 'react';

import { useUpdatePostsSettings } from 'shared/api/hooks/useUpdatePostsSettings';
import { Select } from 'shared/components/Select';
import { DirectionSelect } from 'shared/modules/noteSettingsTab/DirectionSelect';
import { getOptionTitleFromOrderType } from 'shared/modules/noteSettingsTab/helpers/getOptionTitleFromOrderType';
import { ApiOrderByEntity } from 'shared/types/entities/OrderByEntity';
import { PostsSettingsEntity } from 'shared/types/entities/PostsSettingsEntity';

type Props = {
  postsSettings: PostsSettingsEntity;
  orderBy: ApiOrderByEntity[];
};

export const SortSettings = React.memo(({ orderBy, postsSettings }: Props) => {
  const { mutateAsync } = useUpdatePostsSettings(postsSettings.noteId, postsSettings.id);
  
  const handleOrderByChange = React.useCallback(async (values) => {
    await mutateAsync({
      orderById: Number(values[0]),
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
      <Heading as="h3" fontSize="md">Sorting</Heading>
      <Box
        display="flex"
        gap="3"
        flexDirection="row"
        alignItems="flex-end"
      >
        <Select
          size="sm"
          label="Order by"
          value={[postsSettings.orderById]}
          w="200px"
          options={orderBy.map(({ id, type }) => ({ label: getOptionTitleFromOrderType(type), value: String(id) }))}
          onChange={handleOrderByChange}
        />
        <DirectionSelect value={postsSettings.sort} onChange={handleSortChange} />
      </Box>
    </Card.Root>
  );
});
