import { Center } from '@chakra-ui/react';
import { TbError404 } from 'react-icons/tb';

import { EmptyState } from 'shared/components/ui/empty-state';

export const NoteNotFound = () => {
  return (
    <Center h="full">
      <EmptyState
        icon={<TbError404 />}
        title="Not found"
        description="The note you are looking for cannot be found"
      />
    </Center>
  );
};

export default NoteNotFound;