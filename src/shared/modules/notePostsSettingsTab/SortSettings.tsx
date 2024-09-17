import React from 'react';

import { Card, Text, Box, Select, Heading } from '@chakra-ui/react';

import { useUpdatePostsSettings } from 'shared/api/hooks/useUpdatePostsSettings';
import { getOptionTitleFromOrderType } from 'shared/modules/notePostsSettingsTab/helpers/getOptionTitleFromOrderType';
import { ApiOrderByEntity } from 'shared/types/entities/OrderByEntity';
import { PostsSettingsEntity } from 'shared/types/entities/PostsSettingsEntity';

type Props = {
  postsSettings: PostsSettingsEntity,
  orderBy: ApiOrderByEntity[],
};

export const SortSettings = React.memo(({ orderBy, postsSettings }: Props) => {
  const { mutateAsync } = useUpdatePostsSettings(postsSettings.noteId, postsSettings.id);
  
  const handleOrderByChange = React.useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    mutateAsync({
      orderById: Number(event.target.value),
    });
  }, [mutateAsync]);

  const handleSortChange = React.useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    mutateAsync({
      sort: event.target.value as PostsSettingsEntity['sort'],
    });
  }, [mutateAsync]);

  return (
    <Card
      p="4"
      gap="3"
    >
      <Heading as="h3" fontSize="lg">Sorting</Heading>
      <Box 
        display="flex"
        justifyContent="space-between"
        flexDirection="row"
        alignItems="center"
      >
        <Text fontWeight="500">Order by</Text>
        <Box>
          <Select
            size="sm"
            value={postsSettings.orderById}
            onChange={handleOrderByChange}
          >
            {orderBy.map(({ id, type }) => <option key={id} value={id}>{getOptionTitleFromOrderType(type)}</option>)}
          </Select>
        </Box>
      </Box>
      <Box 
        display="flex"
        justifyContent="space-between"
        flexDirection="row"
        alignItems="center"
      >
        <Text fontWeight="500">Direction</Text>
        <Box>
          <Select
            size="sm"
            value={postsSettings.sort}
            onChange={handleSortChange}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </Select>
        </Box>
      </Box>
    </Card>
  );
});
