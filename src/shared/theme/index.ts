import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';
import { buttonRecipe } from 'shared/theme/recipes/button';

import { textareaRecipe } from 'shared/theme/recipes/textarea';
import { getEditorStyles } from 'shared/theme/styles';

// import { Alert } from 'shared/theme/components/alert';
// import { Button } from 'shared/theme/components/button';
// import { Card } from 'shared/theme/components/card';
// import { Container } from 'shared/theme/components/container';
// import { Drawer } from 'shared/theme/components/drawer';
// import { FormLabel } from 'shared/theme/components/form';
// import { Input } from 'shared/theme/components/input';
// import { Menu } from 'shared/theme/components/menu';
// import { Modal } from 'shared/theme/components/modal';
// import { Popover } from 'shared/theme/components/popover';
// import { Textarea } from 'shared/theme/components/textarea';
// import { Tooltip } from 'shared/theme/components/tooltip';
// import { colors } from 'shared/theme/foundations/colors';
// import { semanticTokens } from 'shared/theme/foundations/semanticTokens';
// import { styles } from 'shared/theme/styles';

// const overrides = {
//   styles,
//   colors,
//   semanticTokens,
//   components: {
//     Alert,
//     Button,
//     Card,
//     Modal,
//     Popover,
//     Container,
//     Textarea,
//     Menu,
//     Input,
//     Tooltip,
//     FormLabel,
//     Drawer,
//   },
//   config: {
//     cssVarPrefix: 'dn',
//   },
// };

const customConfig = defineConfig({
  theme: {
    
    recipes: {
      textarea: textareaRecipe,
      button: buttonRecipe,
    },
  },
  globalCss: {
    'html, body, #root': {
      width: '100%',
      height: '100%',
    },
    'body > iframe': {
      display: 'none',
    },
    body: {
      background: 'body',
    },
    '.clear': {
      clear: 'both',
    },
    '.ProseMirror': getEditorStyles(), // .ProseMirror
    '*': {
      'WebkitTapHighlightColor': 'transparent',
    },
  },
});

const appTheme = createSystem(defaultConfig, customConfig);

export default appTheme;
