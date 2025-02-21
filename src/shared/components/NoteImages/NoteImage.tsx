import React from 'react';

import { decodeBlurHash } from 'shared/util/decodeBlurHash';

type Props = {
  src: string;
  height: number;
  width: number;
  blurhash?: string;
  lazy?: boolean;
  onClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
}

export const NoteImageComponent = ({ blurhash, height, width, src, onClick, ...restProps }: Props, ref) => {
  const [isLoaded, setLoaded] = React.useState(false);
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
        backgroundImage: placeholder && !isLoaded ? `url(${placeholder})` : undefined,
        backgroundSize: 'cover',
        borderRadius: 6, 
      }}
      height={height}
      width={width}
      onLoad={() => {
        setLoaded(true);
      }}
      onClick={onClick}
    />
  );
};

export const NoteImage = React.memo(React.forwardRef(NoteImageComponent));
