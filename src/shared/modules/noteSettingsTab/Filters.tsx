import { IconButton } from '@chakra-ui/react';

import { FilterIcon } from 'shared/components/ui/icons';

type Props = {}

export const Filters = (_props: Props) => {
  return (
    <IconButton
      px="2"
      variant="outline"
      size="sm"
    >
      <FilterIcon />
    </IconButton>
  );
};
