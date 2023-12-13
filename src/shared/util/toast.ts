import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast({ 
  defaultOptions: { 
    colorScheme: 'brand',
    containerStyle: { 
      m: '1' ,
      fontWeight: 400,
    },
  } });

export { 
  toast,
};