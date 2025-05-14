import { Box, BoxProps, Stack, Text } from '@chakra-ui/react';

import { Switch, SwitchProps } from 'shared/components/ui/switch';

export type Props = {
  icon?: React.ReactElement;
  label?: React.ReactNode;
  description?: React.ReactNode;
  checked?: boolean;
  switchSize?: SwitchProps['size'];
  onCheckedChange: SwitchProps['onCheckedChange'];
  ref?: React.Ref<HTMLDivElement>;
} & BoxProps;

export const SwitchSection = (props: Props) => {
  const {
    label,
    description,
    // icon,
    checked,
    onCheckedChange,
    ref,
    switchSize = 'lg',
    ...restProps
  } = props;

  return (
    <Box
      ref={ref}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      gap="2"
      {...restProps}
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
        size={switchSize}
        onCheckedChange={onCheckedChange}
      />
    </Box>
  );
};
