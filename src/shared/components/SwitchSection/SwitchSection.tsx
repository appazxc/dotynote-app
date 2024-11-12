import { Box, Card, FormControl, FormHelperText, FormLabel } from '@chakra-ui/react';
import React from 'react';

import { Switch } from 'shared/components/ui/switch';

type Props = {
  label: string,
  description: string,
  isChecked: boolean,
  onChange: (details: { checked: boolean }) => void,
  asFormControl?: any,
  asFormLabel?: any,
  asFormDescription?: any,
};

export const SwitchSection = React.memo((props: Props) => {
  const { 
    label, 
    description, 
    isChecked, 
    onChange,
    asFormControl: AsFormControl = FormControl,
    asFormLabel: AsFormLabel = FormLabel,
    asFormDescription: AsFormDescription = FormHelperText,
  } = props;

  return (
    <Card.Root
      as={AsFormControl}
      display="flex"
      alignItems="center"
      flexDirection="row"
      p="4"
      justifyContent="space-between"
      gap="2"
    >
      <Box>
        <AsFormLabel fontSize="md" m="0">{label}</AsFormLabel>
        <AsFormDescription mt="1">
          {description}
        </AsFormDescription>  
      </Box>
      <Switch
        checked={isChecked}
        onCheckedChange={onChange}
      />
    </Card.Root>
  );
});
