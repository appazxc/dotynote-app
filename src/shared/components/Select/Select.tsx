import { Select as ChakraSelect, createListCollection } from '@chakra-ui/react';
import React from 'react';

import { 
  SelectContent, 
  SelectItem, 
  SelectLabel, 
  SelectRoot, 
  SelectTrigger, 
  SelectValueText, 
} from 'shared/components/ui/select';

type Props = {
  label?: string,
  placeholder?: string,
  options: { label: string, value: string | number }[],
  onChange: (value: (string | number)[]) => void,
  value: (string | number)[],
} & Omit<ChakraSelect.RootProps, 'onValueChange' | 'value' | 'collection'>;

export const Select = React.memo(({ label, placeholder, size, value, onChange, options, ...restProps }: Props) => {
  const frameworks = React.useMemo(() => createListCollection({
    items: options,
  }), [options]);
  
  const selectValue = React.useMemo(() => value.map(String), [value]);
  
  const handleValueChange = React.useCallback((event) => {
    onChange(event.value);
  }, [onChange]);

  return (
    <SelectRoot
      size={size}
      value={selectValue}
      collection={frameworks}
      onValueChange={handleValueChange}
      {...restProps}
    >
      <SelectLabel>{label}</SelectLabel>
      <SelectTrigger>
        <SelectValueText placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {frameworks.items.map((item) => (
          <SelectItem key={item.value} item={item}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
});
