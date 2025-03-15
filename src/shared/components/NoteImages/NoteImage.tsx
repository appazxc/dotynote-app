import React from 'react';

import { decodeBlurHash } from 'shared/util/decodeBlurHash';

type Props = {
  src: string;
  height: number;
  width: number;
  blurhash?: string;
  lazy?: boolean;
  isLoaded?: boolean;
  onLoad?: () => void;
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  onClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
  ref?: React.Ref<HTMLImageElement>;
}

export const NoteImage = React.memo((props: Props) => {
  const { 
    blurhash,
    height,
    width,
    src,
    onClick,
    isLoaded: isLoadedProp = false,
    onError,
    onLoad,
    ref,
    ...restProps 
  } = props;
  const [isLoaded, setLoaded] = React.useState(isLoadedProp);

  const placeholder = React.useMemo(() => {
    if (!blurhash || isLoaded) return null;

    return decodeBlurHash(blurhash, 32, 32);
  }, [blurhash, isLoaded]);

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
        onLoad?.();
      }}
      onError={onError}
      onClick={onClick}
    />
  );
});
