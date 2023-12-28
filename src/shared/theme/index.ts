import { extendTheme } from '@chakra-ui/react';

import { Button } from './components/button';
import { Container } from './components/container';
import { colors } from './foundations/colors';
import { semanticTokens } from './foundations/semanticTokens';
import { styles } from './styles';

const overrides = {
  styles,
  colors,
  semanticTokens,
  components: {
    Button,
    Container,
  },
};

const appTheme = extendTheme(
  overrides
);

export default appTheme;
