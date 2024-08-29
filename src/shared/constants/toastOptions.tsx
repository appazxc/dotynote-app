import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, CloseButton, UseToastOptions } from '@chakra-ui/react';

export const toastOptions: UseToastOptions = {
  status: 'info',
  duration: 3000,
  render: ({ title, description, onClose, status, isClosable = true, icon = false }) => {
    return (
      <Alert
        status={status}
        borderRadius="md"
        py="2"
        pr="2"
      >
        {icon && <AlertIcon />}
        <Box flexGrow="1">
          {title && <AlertTitle>{title}</AlertTitle>}
          {description && (
            <AlertDescription>
              {description}
            </AlertDescription>
          )}
        </Box>
        {isClosable && (
          <Box>
            <CloseButton
              onClick={onClose}
            />
          </Box>
        )}
      </Alert>
    );
  },
};