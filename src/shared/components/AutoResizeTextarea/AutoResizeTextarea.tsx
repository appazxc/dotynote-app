import { chakra, RecipeVariantProps, TextareaProps, useRecipe } from '@chakra-ui/react';
import React from 'react';
import ResizeTextarea from 'react-textarea-autosize';

import { textareaRecipe } from 'shared/theme/recipes/textarea';

const StyledAutoResize = chakra(ResizeTextarea);

type TextareaVariantProps = RecipeVariantProps<typeof textareaRecipe>

interface TextareaRecipeProps
  extends React.PropsWithChildren<TextareaVariantProps> {}
  
export const AutoResizeTextarea = React.forwardRef<
  HTMLTextAreaElement,
  Omit<TextareaProps, 'style'> & TextareaRecipeProps
>((props, ref) => {
  const recipe = useRecipe<'textarea'>({ key: 'textarea' });
  const [recipeProps, restProps] = recipe.splitVariantProps(props);
  const styles = recipe({ ...recipeProps, variant: 'plain' });

  return (
    <StyledAutoResize
      ref={ref}
      minH="unset"
      overflow="hidden"
      w="100%"
      resize="none"
      bg="transparent"
      minRows={1}
      css={styles}
      {...restProps}
    />
  );
});