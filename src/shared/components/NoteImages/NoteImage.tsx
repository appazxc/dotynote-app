import { Box, Image as ChakraImage } from '@chakra-ui/react';
import { decode } from 'blurhash';
import React from 'react';

type Props = {
  src: string,
  height: number,
  width: number,
  blurhash?: string,
  onClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void
}

const loadedImages = new Set<string>();

export const NoteImage = React.memo(({ blurhash, height, width, src, onClick }: Props) => {
  const [isLoaded, setIsLoaded] = React.useState(!blurhash || loadedImages.has(src));

  const placeholder = React.useMemo(() => {
    if (!blurhash) return null;

    return decodeBlurHash(blurhash, 32, 32);
  }, [blurhash]);

  const handleImageLoad = () => {
    loadedImages.add(src);
    setIsLoaded(true);
  };

  return (
    <Box
      position="relative"
      height={height}
      width={width}
      overflow="hidden"
      borderRadius="sm"
    >
      {placeholder && (
        <Box
          position="absolute"
          top="0"
          left="0"
          height={height}
          width={width}
          backgroundImage={`url(${placeholder})`}
          backgroundSize="cover"
        />
      )}
   
      <ChakraImage
        src={src}
        position="relative"
        alt="Image"
        background="gray.300"
        height={height}
        width={width}
        fit="cover"
        opacity={isLoaded ? 1 : 0}
        transition="opacity 0.5s ease-in-out"
        onLoad={handleImageLoad}
        onClick={onClick}
      />
    </Box>
  );
});

function decodeBlurHash(blurHash: string, width: number, height: number) {
  const pixels = decode(blurHash, width, height);
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  
  const imageData = context!.createImageData(width, height);
  imageData.data.set(pixels);
  context!.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
}
