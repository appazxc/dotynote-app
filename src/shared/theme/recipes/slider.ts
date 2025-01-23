import { sliderAnatomy as arkSliderAnatomy } from '@ark-ui/react/slider';
import { defineSlotRecipe } from '@chakra-ui/react';

export const sliderAnatomy = arkSliderAnatomy.extendWith('markerIndicator');

export const sliderSlotRecipe = defineSlotRecipe({
  slots: sliderAnatomy.keys(),
  variants: {
    size: {
      xs: {
        root: {
          '--slider-thumb-size': 'sizes.2',
          '--slider-track-size': 'sizes.1',
          '--slider-marker-center': '6px',
          '--slider-marker-size': 'sizes.1',
          '--slider-marker-inset': '3px',
        },
      },
    },
  },
});