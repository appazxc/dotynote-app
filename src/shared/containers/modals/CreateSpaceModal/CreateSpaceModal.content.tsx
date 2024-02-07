import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  FormErrorMessage,
  FormControl,
  Input,
  ModalCloseButton,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useCreateSpace } from 'shared/api/hooks/useCreateSpace';
import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';
import { hideModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';

export type Props = Record<string, never>

const schema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Name must not be longer than 30 characters.',
    }),
});

type FormValues = z.infer<typeof schema>

const CreateSpaceModal = () => {
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });
  const { mutateAsync } = useCreateSpace();

  async function onSubmit(values) {
    try {
      await mutateAsync(values);
    } finally {
      await queryClient.invalidateQueries({ queryKey: options.spaces.userList().queryKey });
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
                {...register('name')}
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