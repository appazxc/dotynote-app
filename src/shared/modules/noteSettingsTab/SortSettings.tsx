import { Card, Text, Box, Heading } from '@chakra-ui/react';
import React from 'react';

import { useUpdatePostsSettings } from 'shared/api/hooks/useUpdatePostsSettings';
import { Select } from 'shared/components/Select';
import { getOptionTitleFromOrderType } from 'shared/modules/noteSettingsTab/helpers/getOptionTitleFromOrderType';
import { ApiOrderByEntity } from 'shared/types/entities/OrderByEntity';
import { PostsSettingsEntity } from 'shared/types/entities/PostsSettingsEntity';

type Props = {
  postsSettings: PostsSettingsEntity,
  orderBy: ApiOrderByEntity[],
};

const sortOptions = [{ label: 'Ascending', value: 'asc' }, { label: 'Descending', value: 'desc' }];

export const SortSettings = React.memo(({ orderBy, postsSettings }: Props) => {
  const { mutateAsync } = useUpdatePostsSettings(postsSettings.noteId, postsSettings.id);
  
  const handleOrderByChange = React.useCallback((values) => {
    mutateAsync({
      orderById: Number(values[0]),
    });
  }, [mutateAsync]);

  const handleSortChange = React.useCallback((values) => {
    mutateAsync({
      sort: values[0] as PostsSettingsEntity['sort'],
    });
  }, [mutateAsync]);

  return (
    <Card.Root
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
            value={[postsSettings.orderById]}
            w="200px"
            options={orderBy.map(({ id, type }) => ({ label: getOptionTitleFromOrderType(type), value: String(id) }))}
            onChange={handleOrderByChange}
          />
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
            value={[postsSettings.sort]}
            w="200px"
            options={sortOptions}
            onChange={handleSortChange}
          />
        </Box>
      </Box>
    </Card.Root>
  );
});
