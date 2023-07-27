import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { Stack, Button, Container } from '@chakra-ui/react';
import { AppLayout } from 'desktop/modules/app/components/AppLayout';

import { getAppUrl } from '../../helpers/getAppUrl';
import { appRouteNames } from '../../constants/appRouteNames';

export const NoteTab = (props) => {
  const { noteId = '' } = useParams();
  const navigate = useNavigate();

  return (
    <AppLayout showNoteMenu>
      <div>
        NoteTab
        <Container justifyContent="center">
          <Stack w="fit-content" mx="auto">
            <Button onClick={() => navigate(-1)}>Перейти назад</Button>
            <Button onClick={() => navigate(getAppUrl(appRouteNames.note, { pathParams: { noteId: +noteId + 1 } }), { replace: true })}>Перейти на следующий нот</Button>
            <Button onClick={() => navigate('/dsadas')}>Перейти на неизвестную страницу</Button>
          </Stack>
        </Container>

        <div>
          id = {noteId}
        </div>
      </div>
    </AppLayout>
  );
}
