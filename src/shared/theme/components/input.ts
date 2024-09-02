import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const primary = definePartsStyle(props => {
  return ({
    field: {
      backgroundColor: '#f5f5f5',
      borderRadius: '2xl',
      borderWidth: '0px',
      fontWeight: 500,
      transitionProperty: 'var(--dn-transition-property-colors)',
      _placeholder: {
        color: '#989898',
      },
      _hover: {
        backgroundColor: '#f5f5f5',
      },
      _focusVisible: {
        borderColor: 'initial',
        boxShadow: 'inset 0 0 0 calc(2px + 0px) hsl(0 0% 6.67% / 1)',
      },  
    },
  });
});

const lg = defineStyle({
  fontSize: 'md',
});

const sizes = {
  lg: definePartsStyle({ field: lg, addon: lg }),
};

export const Input = defineMultiStyleConfig({ 
  sizes,
  defaultProps: {
    size: 'lg',
    variant: 'primary',
  },
  variants: {
    primary,
  },
});
