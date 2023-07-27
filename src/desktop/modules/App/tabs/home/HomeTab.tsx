import { Box, Button } from '@chakra-ui/react';
import React from 'react';
import router from 'desktop/routes/router';
import { useNavigate } from 'react-router';
import { AppLayout } from 'desktop/modules/app/components/AppLayout';

import { getAppUrl } from '../../helpers/getAppUrl';
import { appRouteNames } from '../../constants/appRouteNames';

function HomeTab() {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <Box display="flex" flexDirection="column">
        HomePage of note

        <Button onClick={() => navigate(getAppUrl(appRouteNames.note, { pathParams: { noteId: '1' } }))}>Перейти в нот</Button>
        <Button onClick={() => router.navigate(getAppUrl(appRouteNames.home))}>Вернуться на главную страницу</Button>
      </Box>
    </AppLayout>
  );
}

export { HomeTab };
