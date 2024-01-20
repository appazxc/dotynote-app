import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { useCreateSpace } from 'shared/api/hooks/useCreateSpace';
import { queries } from 'shared/api/queries';
import { queryClient } from 'shared/api/queryClient';
import { hideModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';

export type Props = Record<string, never>

const CreateSpaceModal = () => {
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<{ name: string }>();
  const { mutateAsync } = useCreateSpace();
  async function onSubmit(values) {
    try {
      await mutateAsync(values);
    } finally {
      await queryClient.invalidateQueries({ queryKey: [queries.spaces.list().queryKey[0]] });
      dispatch(hideModal());
    }
  }

  return (
    <Modal
      isCentered
      isOpen
      size="md"
      onClose={() => dispatch(hideModal())}
    >
      <ModalOverlay />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent>
          <ModalHeader pb="1">Create space</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={!!errors.name}>
              <Input
                id="name"
                placeholder="Space name"
                {...register('name', {
                  required: 'Required',
                  minLength: { value: 4, message: 'Minimum length should be 4' },
                })}
              />
              <FormErrorMessage>
                {!!errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="brand"
              variant="ghost"
              onClick={() => dispatch(hideModal())}
              mr={3}
            >
            Cancel
            </Button>
            <Button
              colorScheme="brand"
              isLoading={isSubmitting}
              type="submit"
            >
            Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default CreateSpaceModal;