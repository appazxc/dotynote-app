import { ColorModeScript } from '@chakra-ui/react';
import * as ReactDOM from 'react-dom/client';

import { initialize } from 'shared/core/actions/initializeActions';
import theme from 'shared/theme';

import Main from './shared/core';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(container);

initialize().then(() => {
  root.render(
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Main />
    </>
  );
});
