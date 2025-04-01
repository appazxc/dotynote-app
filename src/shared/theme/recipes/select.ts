import { selectAnatomy as arkSelectAnatomy } from '@ark-ui/react/select';
import { defineSlotRecipe } from '@chakra-ui/react';

export const selectAnatomy = arkSelectAnatomy.extendWith('indicatorGroup');

export const selectSlotRecipe = defineSlotRecipe({
  slots: selectAnatomy.keys(),
  variants: {
    variant: {
      plain: {
        trigger: {
          pl: '0',
          pr: '10',
          borderWidth: '1px',
          borderColor: 'transparent',
          minH: 'auto',
        },
        valueText: {
          whiteSpace: 'nowrap',
          lineClamp: 'none',
        },
      },
    },
  },
});