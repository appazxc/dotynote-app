import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { Box, Button } from '@chakra-ui/react';

export default function NotePage(props) {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <div>NotePage
      <Button onClick={() => navigate('/')}>Перейти на стартовую страницу</Button>

      <div>
        {JSON.stringify(params, null, 2)}
      </div>
    </div>
  );
}
