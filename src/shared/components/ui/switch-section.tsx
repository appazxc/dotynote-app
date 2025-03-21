import { Box, Stack, Text } from '@chakra-ui/react';

import { Switch, SwitchProps } from 'shared/components/ui/switch';

export type Props = {
  icon?: React.ReactElement;
  label?: React.ReactNode;
  description?: React.ReactNode;
  checked?: boolean;
  onCheckedChange: SwitchProps['onCheckedChange'];
  ref?: React.Ref<HTMLDivElement>;
}

export const SwitchSection = (props: Props) => {
  const {
    label,
    description,
    // icon,
    checked,
    onCheckedChange,
    ref,
  } = props;

  return (
    <Box
      ref={ref}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      gap="2"
    >
      <Stack gap="1">
        {label && <Text fontWeight="medium" fontSize="sm">{label}</Text>}
        {description && (
          <Text opacity="0.64" fontSize="sm">
            {description}
          </Text>
        )}
      </Stack>
      <Switch 
        checked={checked} 
        size="lg"
        onCheckedChange={onCheckedChange}
      />
    </Box>
  );
};
