import React from "react";
import { Box, Container, Stack, Text } from "@chakra-ui/react";
import { Posts } from "./containers/Posts";
import { useParams } from "react-router";
import { useQueryParams } from "shared/hooks/useQueryParams";
import { NoteMenu } from "./containers/NoteMenu";
import { useScrollContext } from "shared/components/ScrollProvider";

export const NotePage = () => {
  const { noteId = "" } = useParams();
  const { postId = "" } = useQueryParams();
  const scrollRef = useScrollContext();

  React.useEffect(() => {
    if (scrollRef?.current) {
      scrollRef.current.scrollTo(0, 0);
    }
  }, [noteId, scrollRef]);

  return (
    <>
      <NoteMenu noteId={noteId} />
      <Container>
        <Stack gap="5">
          <Box
            h="150"
            border="1px solid green"
            borderRadius="lg"
          >
            <Text>note content {noteId}</Text>
            <Text>postId {postId}</Text>
          </Box>
          <Posts
            key={noteId}
            noteId={noteId}
            postId={postId}
          />
        </Stack>
      </Container>
    </>
  );
};
