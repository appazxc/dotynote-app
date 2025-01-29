import React from 'react';

import { AutoResizeTextarea } from 'shared/components/AutoResizeTextarea';
import { useEditorContext } from 'shared/modules/editor';

type Props = {
  title?: string,
  isMobile: boolean,
  onChange: (title: string) => void,
}

export const EditableTitle = ({ title, isMobile, onChange }: Props) => {
  const [value, setValue] = React.useState(title || '');
  const editor = useEditorContext();

  const handleChange = React.useCallback((e) => {
    setValue(e.target.value);
    onChange(e.target.value);
  }, [onChange]);

  const handleKeyDown = React.useCallback((event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      editor.commands.focus('end');
    }
  }, [editor]);

  return (
    <AutoResizeTextarea
      placeholder="Title"
      p="0"
      fontSize={isMobile ? 'xl' : '4xl'}
      lineHeight="1.2"
      fontWeight="500"
      borderWidth="0"
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
};
