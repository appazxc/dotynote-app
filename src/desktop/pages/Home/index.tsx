import { Box, Button } from '@chakra-ui/react';
import { useThemedColor } from 'chakra-radix-colors';
import { Layout } from 'desktop/components/Layout';
import React from 'react';
import { Link } from 'react-router-dom';
import { ColorModeSwitcher } from 'shared/components/ColorModeSwitcher';
import { addToken } from 'shared/state/auth/auth.slice';
import { useAppDispatch } from 'shared/state/hooks';

function Home() {
  const dispatch = useAppDispatch();

  return (
    <Layout>
      <div>
        <ColorModeSwitcher />
        <div>
          Home
        </div>
        <Button onClick={() => dispatch(addToken('helloooo'))}>hello button</Button>
        <Box flexDirection="column" display="flex">
          <Link to="/app" >App</Link>
          <Link to="/hhmm" >NotFound</Link>
        </Box>
      </div>
    </Layout>
  );
}

export default Home;
