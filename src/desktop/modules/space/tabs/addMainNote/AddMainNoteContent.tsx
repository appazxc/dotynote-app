import {
  Button,
  Center,
  Container,
} from '@chakra-ui/react';

import { modalIds } from 'shared/constants/modalIds';
import { SelectNoteModal } from 'shared/containers/modals/SelectNoteModal';
import { showModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';

import { TabLayout } from 'desktop/modules/space/components/TabLayout';

const extraId = 'AddMainNoteContent';

export const AddMainNoteContent = () => {
  const dispatch = useAppDispatch();
  
  return (
    <TabLayout>
      <Container h="full">
        <Center
          display="flex"
          flexDirection="column"
          h="full"
        >
          <Button
            colorScheme="brand"
            variant="outline"
            onClick={() => {
              dispatch(showModal({ id: modalIds.selectNote, extraId }));
            }}
          >
            Add main note
          </Button>
        </Center>
        <SelectNoteModal
          extraId={extraId}
          onSelect={(value) => {
            console.log('SelectNoteModal onSelect value', value);
          }}
        />
      </Container>
    </TabLayout>
  );
};

export default AddMainNoteContent;