import { Box } from '@chakra-ui/react';
import { useLongPress } from '@uidotdev/usehooks';
import React from 'react';

import { useNoteAudio } from 'shared/modules/noteAudio/useNoteAudio';

type Props = {
  audioId: string;
};

// https://codepen.io/mrfrk/pen/BVKmKo
const spans = [
  {
    height: '12px',
    animationDuration: 474,
  }, 
  {
    height: '6px',
    animationDuration: 433,
  }, 
  {
    height: '12px',
    animationDuration: 407,
  }, 
  {
    height: '6px',
    animationDuration: 458,
  }, 
  {
    height: '12px',
    animationDuration: 400,
  }, 
];

export const SoundMenu = React.memo((props: Props) => {
  const { audioId } = props;
  const { isPlaying, stop } = useNoteAudio(audioId);
  
  const buttonProps = useLongPress(
    () => stop(),
    { threshold: 500 }
  );

  return (
    <Box
      className="Sound"
      width="24px"
      height="25px"
      display="flex"
      alignItems="center"
      justifyContent="space-around"
      {...buttonProps}
    >
      {spans.map(({ height, animationDuration }, index) => (
        <Box 
          key={index}
          height={height}
          w="2px"
          mr="1px"
          bg="gray.800"
          animation={isPlaying ? `sound ${animationDuration * 1.5}ms -.8s linear infinite alternate` : 'none'}
          transition="height .8s, background .3s"
        />
      ))}
    </Box>
  );
});
