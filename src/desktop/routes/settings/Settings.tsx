import { Box, Button, Card, Text } from '@chakra-ui/react';

import { SettingsLayout } from 'desktop/components/SettingsLayout';

function Settings() {
  return (
    <SettingsLayout>
      <Card p="4">
        <Box>
          <Text fontWeight="600">Auto stick all notes to note</Text>
          <Text color="gray.400" fontSize="sm">
            All notes that you will create will be sticked to note that you select here
          </Text>
          <Button mt="4">Set</Button>
        </Box>
      </Card>
    </SettingsLayout>
  );
}

export { Settings };
