import { extendTheme } from '@chakra-ui/react';
import { theme } from 'chakra-radix-colors';

export default extendTheme(
  theme,
  {
    styles: {
      global: {
        'html, body, #root': {
          width: '100%',
          height: '100%',
        },
        'body > iframe': {
          display: 'none',
        },
      },
    },
  });
