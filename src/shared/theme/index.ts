import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

import { buttonRecipe } from 'shared/theme/recipes/button';
import { checkboxSlotRecipe } from 'shared/theme/recipes/checkbox';
import { dialogSlotRecipe } from 'shared/theme/recipes/dialog';
import { sliderSlotRecipe } from 'shared/theme/recipes/slider';
import { textareaRecipe } from 'shared/theme/recipes/textarea';
import { getEditorStyles } from 'shared/theme/styles';

const customConfig = defineConfig({
  theme: {
    recipes: {
      textarea: textareaRecipe,
      button: buttonRecipe,
    },
    slotRecipes: {
      dialog: dialogSlotRecipe,
      checkbox: checkboxSlotRecipe,
      slider: sliderSlotRecipe,
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
      background: 'bg',
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
