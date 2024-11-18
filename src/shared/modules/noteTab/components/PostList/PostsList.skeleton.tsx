import { Center, Spinner } from '@chakra-ui/react';

export const PostsSkeleton = () => {
  return (
    <Center h="100px">
      <Spinner />
    </Center>
  );
};
