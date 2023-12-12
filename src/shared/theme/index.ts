import { extendTheme } from '@chakra-ui/react';

import { Button } from './components/button';
import { colors } from './foundations/colors';
import { styles } from './styles';

const overrides = {
  styles,
  colors,
  components: {
    Button,
  },
};

const appTheme = extendTheme(
  overrides
);

export default appTheme;
