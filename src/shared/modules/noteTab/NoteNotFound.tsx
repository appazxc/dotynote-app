import { Box, Center, Heading, Text } from '@chakra-ui/react';

export const NoteNotFound = () => {
  return (
    <Center h="full">
      <Box
        textAlign="center"
        py={10}
        px={6}
      >
        <Heading
          display="inline-block"
          as="h2"
          size="2xl"
        >
          404
        </Heading>
        <Text
          fontSize="18px"
          mt="3"
          mb="2"
        >
          Note Not Found
        </Text>
        <Text color={'gray.500'} mb={6}>
          The note you{"'"}re looking for does not seem to exist
        </Text>
      </Box>
    </Center>
  );
};

export default NoteNotFound;