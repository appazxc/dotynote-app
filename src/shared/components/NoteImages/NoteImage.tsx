import { Box, Image as ChakraImage } from '@chakra-ui/react';
import { decode } from 'blurhash';
import React from 'react';
import { useIntersectionObserver } from 'usehooks-ts';

type Props = {
  src: string,
  height: number,
  width: number,
  blurhash?: string,
  lazy?: boolean,
  onClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void
}

const loadedImages = new Set<string>();

export const NoteImage = React.memo(({ blurhash, height, width, src, lazy, onClick }: Props) => {
  const [showImage, setShowImage] = React.useState(!blurhash || loadedImages.has(src));
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0,
    freezeOnceVisible: true,
  });
  
  const placeholder = React.useMemo(() => {
    if (!blurhash) return null;

    return decodeBlurHash(blurhash, 32, 32);
  }, [blurhash]);

  const handleImageLoad = () => {
    loadedImages.add(src);
    setShowImage(true);
  };

  return (
    <Box
      ref={ref}
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
   
      {(isIntersecting || !lazy) && (
        <ChakraImage
          src={src}
          position="relative"
          alt="Image"
          background="gray.300"
          height={height}
          width={width}
          fit="cover"
          opacity={showImage ? 1 : 0}
          transition="opacity 0.5s ease-in-out"
          onLoad={handleImageLoad}
          onClick={onClick}
        />
      )}
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
