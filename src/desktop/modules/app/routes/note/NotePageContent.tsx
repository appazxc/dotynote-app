import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { Stack, Button, Container } from '@chakra-ui/react';

import { getAppUrl } from '../../helpers/getAppUrl';
import { appRouteNames } from '../../constants/appRouteNames';

export const NotePageContent = () => {
  const { noteId = '' } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      NoteTab
      <Container justifyContent="center">
        <Stack w="fit-content" mx="auto">
          <Button onClick={() => navigate(-1)}>Перейти назад</Button>
          <Button onClick={() => navigate("/")}>Перейти на главную</Button>
          <Button 
            onClick={() => navigate(getAppUrl(appRouteNames.note, { 
              pathParams: { noteId: +noteId + 1 } 
            }))}
          >
          Перейти на следующий нот
          </Button>
          <Button onClick={() => navigate('/dsadas')}>Перейти на неизвестную страницу</Button>
        </Stack>
      </Container>

      <div>
      id = {noteId}
      </div>
    </div>
  );
};