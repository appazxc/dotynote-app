/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

import { BlurhashImage } from 'shared/components/BlurhashImage';

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

const placeholderStyles = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const BaseImage = React.memo((props: Props) => {
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

  return (
    <div
      css={css`
      position: relative;
      border-radius: 6px;
      overflow: hidden;
    `}
    >
      <img
        ref={ref}
        {...restProps}
        alt="Image"
        loading="lazy"
        src={src}
        height={height}
        width={width}
        onLoad={() => {
          setLoaded(true);
          onLoad?.();
        }}
        onError={onError}
        onClick={onClick}
      />
      {blurhash && !isLoaded && (
        <BlurhashImage
          blurhash={blurhash}
          width={32}
          height={32}
          css={placeholderStyles}
          onClick={onClick}
        />
      )}
    </div>
  );
});
