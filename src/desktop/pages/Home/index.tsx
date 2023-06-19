import { Box, Button } from '@chakra-ui/react';
import { useThemedColor } from 'chakra-radix-colors';
import { Layout } from 'desktop/components/Layout';
import React from 'react';
import { Link } from 'react-router-dom';
import { ColorModeSwitcher } from 'shared/components/ColorModeSwitcher';

function Home() {
  return (
    <Layout>
      <div>
        <ColorModeSwitcher />
        Home
        <Button >hello button</Button>
        <Box flexDirection="column" display="flex">
          <Link to="/app" >App</Link>
          <Link to="/hhmm" >NotFound</Link>
        </Box>
      </div>
    </Layout>
  );
}

export default Home;
