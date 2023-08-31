import { Box, Progress, css } from "@chakra-ui/react";
import React from "react";
import { SpaceLayoutHeader } from "../SpaceLayoutHeader";
import { useAppSelector } from "shared/store/hooks";
import { ScrollProvider } from "shared/components/ScrollProvider";
import { NoteMenuRefProvider } from "../SpaceMenuRefProvider";
import { useAppInProgress } from "shared/modules/loaders/loadersSlice";
import styled from "@emotion/styled";
type Props = React.PropsWithChildren<unknown>;

const sidebarWidth = "300px";

export const SpaceLayout = ({ children }: Props) => {
  const isLoading = useAppSelector((state) => state.app.isPageLoading);
  const isAppInProgress = useAppInProgress();
  const isSideOpen = useAppSelector((state) => state.app.isSideOpen);
  console.log('isSideOpen', isSideOpen);

  return (
    <Box
      w="full"
      h="full"
      display="flex"
    >
      <Box
        w={sidebarWidth}
        bg="purple"
        h="full"
        transition="transform 0.1s ease-in-out"
        position="absolute"
        transform={`translateX(-${isSideOpen ? '0' : sidebarWidth})`}
      >
          sidebar
      </Box>

      <NoteMenuRefProvider>
        <Box
          w="full"
          h="full"
          display="flex"
          flexDirection="column"
          pl={!isSideOpen ? "0" : sidebarWidth}
          transition='padding-left 0.1s ease-in-out'
        >
          {isLoading ||
            (isAppInProgress && (
              <Progress
                size="xs"
                isIndeterminate
                position="absolute"
                w="full"
                left="0"
                top="0"
                colorScheme="purple"
                transitionDuration="2s"
              />
            ))}
          <SpaceLayoutHeader />
          <ScrollProvider>
            {(ref) => (
              <Box
                ref={ref}
                bg="red.100"
                flexGrow="1"
                overflowX="hidden"
                overflowY="scroll"
                css={{
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                }}
              >
                {children}
              </Box>
            )}
          </ScrollProvider>
        </Box>
      </NoteMenuRefProvider>
    </Box>
  );
};