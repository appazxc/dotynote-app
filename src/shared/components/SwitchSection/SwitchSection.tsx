import React from 'react';

import { Box, Card, FormControl, FormHelperText, FormLabel, Switch } from '@chakra-ui/react';

type Props = {
  label: string,
  description: string,
  isChecked: boolean,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
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
    <Card
      as={AsFormControl}
      display="flex"
      alignItems="center"
      flexDirection="row"
      py="4"
      justifyContent="space-between"
      boxShadow="none"
      gap="2"
    >
      <Box>
        <AsFormLabel fontSize="md" m="0">{label}</AsFormLabel>
        <AsFormDescription mt="1">
          {description}
        </AsFormDescription>  
      </Box>
      <Switch
        isChecked={isChecked}
        onChange={onChange}
      />
    </Card>
  );
});
