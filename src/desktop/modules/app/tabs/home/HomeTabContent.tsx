import { Box, Button } from '@chakra-ui/react';
import React from 'react';
import router from 'desktop/routes/router';
import { useNavigate } from 'react-router';

import { getAppUrl } from '../../helpers/getAppUrl';
import { appRouteNames } from '../../constants/appRouteNames';
import { getUrl } from 'shared/helpers/router/getUrl';
import { routeNames } from 'shared/constants/routeNames';

export const HomeTabContent = () => {
  const navigate = useNavigate();

  return (
    <Box display="flex" flexDirection="column">
        HomeTab of note

      <Button
        onClick={() => {
          const url = getAppUrl(appRouteNames.note, { noteId: '1' });

          console.log('url', url);

          navigate(url);
        }}
      >
        Перейти в нот
      </Button>
      <Button onClick={() => router.navigate(getUrl(routeNames.home))}>Вернуться на главную страницу</Button>
    </Box>
  );
};


export default HomeTabContent;