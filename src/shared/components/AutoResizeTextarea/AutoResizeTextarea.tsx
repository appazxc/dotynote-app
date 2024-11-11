import { chakra, TextareaProps, useRecipe } from '@chakra-ui/react';
import React from 'react';
import ResizeTextarea from 'react-textarea-autosize';

const StyledAutoResize = chakra(ResizeTextarea);

export const AutoResizeTextarea = React.forwardRef<
  HTMLTextAreaElement,
  Omit<TextareaProps, 'style'>
>((props, ref) => {
  const recipe = useRecipe({ key: 'textarea' });
  const styles = recipe({ size: 'sm' });
  
  return (
    <StyledAutoResize
      ref={ref}
      minH="unset"
      overflow="hidden"
      w="100%"
      resize="none"
      bg="transparent"
      minRows={1}

      // placeholder="This textarea will autoresize as you type"
      // minH="initial"
      // resize="none"
      // overflow="hidden"
      // lineHeight="inherit"

      {...props}
      css={styles}
    />
  );
});