import { decode } from 'blurhash';
import React from 'react';

type Props = {
  src: string,
  height: number,
  width: number,
  blurhash?: string,
  lazy?: boolean,
  onClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void
}

export const NoteImageComponent = ({ blurhash, height, width, src, onClick, ...restProps }: Props, ref) => {
  const placeholder = React.useMemo(() => {
    if (!blurhash) return null;

    return decodeBlurHash(blurhash, 32, 32);
  }, [blurhash]);

  return (
    <img
      ref={ref}
      {...restProps}
      alt="Image"
      loading="lazy"
      src={src}
      style={{ 
        backgroundColor: 'gray',
        backgroundImage: placeholder ? `url(${placeholder})` : undefined,
        backgroundSize: 'cover', borderRadius: 6, 
      }}
      height={height}
      width={width}
      onClick={onClick}
    />
  );
};

export const NoteImage = React.memo(React.forwardRef(NoteImageComponent));

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
