import { extendTheme } from '@chakra-ui/react';

import { Alert } from 'shared/theme/components/alert';
import { Button } from 'shared/theme/components/button';
import { Card } from 'shared/theme/components/card';
import { Container } from 'shared/theme/components/container';
import { Drawer } from 'shared/theme/components/drawer';
import { Menu } from 'shared/theme/components/menu';
import { Modal } from 'shared/theme/components/modal';
import { Popover } from 'shared/theme/components/popover';
import { Textarea } from 'shared/theme/components/textarea';
import { Tooltip } from 'shared/theme/components/tooltip';
import { colors } from 'shared/theme/foundations/colors';
import { semanticTokens } from 'shared/theme/foundations/semanticTokens';
import { styles } from 'shared/theme/styles';

const overrides = {
  styles,
  colors,
  semanticTokens,
  components: {
    Alert,
    Button,
    Card,
    Modal,
    Popover,
    Container,
    Textarea,
    Menu,
    Tooltip,
    Drawer,
  },
  config: {
    cssVarPrefix: 'dn',
  },
};

const appTheme = extendTheme(
  overrides
);

export default appTheme;
