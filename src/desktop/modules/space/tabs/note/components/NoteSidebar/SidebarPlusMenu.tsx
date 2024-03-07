import { Box, Text, IconButton, Popover, PopoverBody, PopoverContent, PopoverTrigger, Button } from '@chakra-ui/react';
import { BsPlus } from 'react-icons/bs';

export const SidebarPlusMenu = () => {
  return (
    <Popover placement="right-start">
      <PopoverTrigger>
        <IconButton
          size="sm"
          variant="ghost"
          aria-label="Note add"
          icon={<BsPlus size="22px" />}
        />
      </PopoverTrigger>
      <PopoverContent width="md">
        <PopoverBody>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Text>Add to</Text>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              gap="2"
            >
              <Button size="xs" variant="ghost">Note</Button>
              /
              <Button size="xs">Posts</Button>
            </Box>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
