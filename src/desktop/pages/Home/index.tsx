import { Box } from '@chakra-ui/react';
import { useThemedColor } from 'chakra-radix-colors';
import { Layout } from 'desktop/components/Layout';
import React from 'react';
import { ColorModeSwitcher } from 'shared/components/ColorModeSwitcher';

function Home() {
  const c = useThemedColor();

  return (
    <Layout>
      <div>
        <ColorModeSwitcher />
        Home
        <Box bg={c('sky.3')}>
          hello
        </Box>
      </div>
    </Layout>
  );
}

export default Home;
