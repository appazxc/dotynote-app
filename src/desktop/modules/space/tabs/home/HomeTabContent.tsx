import { Box, Button } from '@chakra-ui/react';
import React from 'react';
import router from 'desktop/routes/router';
import { useNavigate } from 'react-router';

import { getTabUrl } from '../../../../../shared/modules/space/helpers/getTabUrl';
import { tabNames } from '../../../../../shared/modules/space/constants/tabNames';
import { getUrl } from 'shared/helpers/router/getUrl';
import { routeNames } from 'shared/constants/routeNames';

export const HomeTabContent = () => {

  return (
    <Box display="flex" flexDirection="column">
        HomeTab of note

      <Button
        onClick={() => {
          const url = getTabUrl(tabNames.note, { noteId: '1' });

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