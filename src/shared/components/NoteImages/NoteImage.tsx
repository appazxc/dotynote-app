import { Box, BoxProps, Center, Float, Icon, Image } from '@chakra-ui/react';
import React from 'react';

type Props = {
  src: string,
  height: number,
  width: number,
  onClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void
}

export const NoteImage = React.memo(({ height, width, src, onClick }: Props) => {
  return (
    <Image
      src={src}
      alt="Image"
      background="gray.300"
      height={height}
      width={width}
      fit="cover"
      borderRadius="sm"
      onClick={onClick}
    />
  );
});
