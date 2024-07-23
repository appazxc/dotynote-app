import { extendTheme } from '@chakra-ui/react';

import { Button } from './components/button';
import { Card } from './components/card';
import { Container } from './components/container';
import { Menu } from './components/menu';
import { Modal } from './components/modal';
import { Popover } from './components/popover';
import { Textarea } from './components/textarea';
import { Tooltip } from './components/tooltip';
import { colors } from './foundations/colors';
import { semanticTokens } from './foundations/semanticTokens';
import { styles } from './styles';

const overrides = {
  styles,
  colors,
  semanticTokens,
  components: {
    Button,
    Card,
    Modal,
    Popover,
    Container,
    Textarea,
    Menu,
    Tooltip,
  },
  config: {
    cssVarPrefix: 'dn',
  },
};

const appTheme = extendTheme(
  overrides
);

export default appTheme;
