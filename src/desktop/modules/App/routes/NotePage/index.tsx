import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { Box, Stack, Button } from '@chakra-ui/react';

export default function NotePage(props) {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <div>NotePage
      <Stack>
        <Button onClick={() => navigate(-1)}>Перейти назад</Button>
        <Button onClick={() => navigate(`/note/${+params.id + 1}`)}>Перейти на следующий нот</Button>

      </Stack>

      <div>
        {JSON.stringify(params, null, 2)}
      </div>
    </div>
  );
}
