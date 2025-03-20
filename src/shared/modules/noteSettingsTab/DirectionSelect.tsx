import { IconButton } from '@chakra-ui/react';
import React from 'react';

import { ArrowDownIcon, ArrowUpIcon } from 'shared/components/ui/icons';

type Props = {
  value: 'asc' | 'desc';
  onChange: (value: 'asc' | 'desc') => void;
}

const directionsIcons = {
  desc: <ArrowDownIcon />,
  asc: <ArrowUpIcon />,
};

export const DirectionSelect = ({ value, onChange }: Props) => {
  const handleValueChange = React.useCallback(() => {
    onChange(value === 'asc' ? 'desc' : 'asc');
  }, [onChange, value]);

  return (
    <IconButton
      px="2"
      variant="outline"
      size="sm"
      onClick={handleValueChange}
    >
      {directionsIcons[value]}
    </IconButton>
  );
};
