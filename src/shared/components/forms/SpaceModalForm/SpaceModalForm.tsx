import {
  Button,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormMessage,
} from 'shared/components/Form';
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

const initialValues = {
  name: '',
};

export const SpaceModalForm = ({ title, defaultValues = initialValues, onSubmit, submitText }) => {
  const dispatch = useAppDispatch();
  const form = useForm<FormValues>({ 
    defaultValues, 
    resolver: zodResolver(schema),
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent>
          <ModalHeader pb="1">{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormField 
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormControl>
                  <Input
                    id="name"
                    placeholder="Space name"
                    {...field}
                  />
                  <FormMessage />
                </FormControl>
              )}
            />
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
              {submitText}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Form>

  );
};
