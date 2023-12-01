import { Box, Button } from '@chakra-ui/react';
import React from 'react';

import { buildTabUrl } from 'shared/modules/space/util/buildTabUrl';
import { tabNames } from 'shared/modules/space/constants/tabNames';

export const HomeTabContent = () => {

  return (
    <Box display="flex" flexDirection="column">
        HomeTab of note

      <Button
        onClick={() => {
          const url = buildTabUrl({ routeName: tabNames.note, pathParams: { noteId: '1' }});

          console.log('url', url);

        }}
      >
        Перейти в нот
      </Button>
      <Button onClick={() => {}}>Вернуться на главную страницу</Button>
    </Box>
  );
};


export default HomeTabContent;