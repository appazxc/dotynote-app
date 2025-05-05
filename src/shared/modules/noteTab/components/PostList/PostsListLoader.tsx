import { Center, Spinner } from '@chakra-ui/react';

export const PostsLoader = () => {
  return (
    <Center h="80px">
      <Spinner />
    </Center>
  );
};
