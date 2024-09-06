import React from 'react';

import { FormControl, FormDescription, FormLabel } from 'shared/components/Form';
import { SwitchSection } from 'shared/components/SwitchSection';

type Props = {
  label: string,
  description: string,
  isChecked: boolean,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
};

export const FormSwitchSection = React.memo((props: Props) => {
  return (
    <SwitchSection 
      {...props}
      asFormControl={FormControl}
      asFormLabel={FormLabel}
      asFormDescription={FormDescription}
    />
  );
});
