import React from 'react';

import { CheckboxCard } from 'shared/components/ui/checkbox-card';

type Props = {
  label: string,
  description: string,
  checked: boolean,
  onChange: (details: { checked: boolean }) => void,
};

export const SwitchSection = React.memo((props: Props) => {
  const { 
    label, 
    description, 
    checked, 
    onChange,
  } = props;

  return (
    <CheckboxCard
      label={label}
      checked={checked}
      description={description}
      onCheckedChange={onChange}
    />
  );
});
