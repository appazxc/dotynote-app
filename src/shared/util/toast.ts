import { createStandaloneToast } from '@chakra-ui/react';

import { toastOptions } from 'shared/constants/toastOptions';

const { toast } = createStandaloneToast({ 
  defaultOptions: toastOptions, 
});

export { 
  toast,
};