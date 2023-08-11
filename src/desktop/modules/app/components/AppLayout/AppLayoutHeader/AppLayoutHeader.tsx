import { Box, IconButton } from '@chakra-ui/react';
import React from 'react';
import { useAppSelector } from 'shared/store/hooks';
import { selectActiveSpaceTabs } from 'shared/store/slices/appSlice';
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import { BsThreeDotsVertical, BsPlus } from 'react-icons/bs';

import { SpaceTab } from './SpaceTab';

type Props = {
  showNoteMenu?: boolean,
}

export const AppLayoutHeader = ({ showNoteMenu }: Props) => {
  const spaceTabs = useAppSelector(selectActiveSpaceTabs);

  return (
    <Box
      w="full"
      px="2"
      py="2"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      flexShrink="0"
    >
      <Box
        display="flex"
        alignItems="center"
        flexGrow="1"
      >
        <IconButton
          size="sm"
          aria-label="Side note menu"
          icon={<AiOutlineMenuUnfold />}
          variant="outline"
        />
        <Box mx="2" color="gray">|</Box>
        <Box
          display="flex"
          flexDirection="row"
          gap="1"
          flexGrow="1"
        >
          {spaceTabs.map(id => <SpaceTab key={id} id={id} />)}
          <IconButton
            size="sm"
            aria-label="Add"
            icon={<BsPlus size="22px" />}
            borderRadius="full"
            variant="ghost"
          />
        </Box>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap="2"
      >
        {showNoteMenu
          ? (
            <Box
              borderRadius="md"
              border="1px solid"
              borderColor="gray.6"
              h="8"
              px="2"
              display="flex"
              alignItems="center"
            >
              <IconButton
                size="xs"
                aria-label="Note menu"
                icon={<BsThreeDotsVertical />}
              />
            </Box>
          )
          : null}

        <IconButton
          size="sm"
          aria-label="User menu"
          icon={<BsThreeDotsVertical />}
          variant="outline"
        />
      </Box>
    </Box>
  );
};
