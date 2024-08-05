import React from 'react';

import { AutoResizeTextarea } from 'shared/components/AutoResizeTextarea';

type Props = {
  title?: string,
  isMobile: boolean,
  onChange: (title: string) => void,
}

export const EditableTitle = ({ title, isMobile, onChange }: Props) => {
  const [value, setValue] = React.useState(title);
  
  const handleChange = React.useCallback((e) => {
    setValue(e.target.value);
    onChange(e.target.value);
  }, [onChange]);

  return (
    <AutoResizeTextarea
      placeholder="Title"
      p="0"
      fontSize={isMobile ? 'xl' : '4xl'}
      variant="plain"
      lineHeight="1.2"
      value={ value }
      onChange={ handleChange }
    />
  );
};
