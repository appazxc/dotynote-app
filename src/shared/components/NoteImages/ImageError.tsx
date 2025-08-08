import { Button, Center, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { IoReloadOutline } from 'react-icons/io5';
import { PiImage } from 'react-icons/pi';

import { stopPropagationFunc } from 'shared/util/stopPropagationFunc';

type Props = {
  width: number;
  height: number;
  onRetry?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const ImageError = React.memo(({ width, height, onRetry }: Props) => {
  const isSmall = width < 100 || height < 100;
  const buttonContent = React.useMemo(() => {
    if (isSmall && width < 60) {
      return <Icon as={IoReloadOutline} />;
    }

    return <>{isSmall ? <><Icon as={PiImage} /> </> : null}Retry</>;
  }, [isSmall, width]);

  return (
    <Center
      width={width}
      height={height}
      bg="bg.error"
      borderRadius={6}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap="3"
      p="4"
      cursor="default"
      onClick={stopPropagationFunc}
      onContextMenu={stopPropagationFunc}
    >
      {!isSmall && (
        <>
          <Icon
            as={PiImage}
            color="fg.error"
            fontSize="2xl"
          />
          <Text
            color="fg.muted"
            fontSize="sm"
            textAlign="center"
          >
            Image load error
          </Text>
        </>
      )}
      
      <Button
        size="2xs"
        variant="subtle"
        colorPalette="red"
        onClick={onRetry}
      >
        {buttonContent}
      </Button>
    </Center>
  );
});
