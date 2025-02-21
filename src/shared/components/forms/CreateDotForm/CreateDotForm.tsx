import { Input } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from 'shared/components/ui/button';
import {
  DialogBody,
  DialogCloseTrigger,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'shared/components/ui/dialog';
import { Field } from 'shared/components/ui/field';

type Props = {
  onSubmit: (values: FormValues) => void;
};

const schema = z.object({
  dot: z
    .string()
    .max(33, {
      message: 'Title must not be longer than 33 characters.',
    })
    .min(2, {
      message: 'Dot must not be shorter than 2 characters.',
    }),
});

type FormValues = z.infer<typeof schema>

export type CreateDotFormValues = FormValues;

const CreateDotFormComponent = ({ onSubmit, ...restProps }: Props, ref) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  return (
    <form
      ref={ref}
      onSubmit={handleSubmit(onSubmit)}
      {...restProps}
    >
      <DialogHeader><DialogTitle>Create dot</DialogTitle></DialogHeader>
      <DialogBody>
        <Field invalid={!!errors.dot} errorText={errors.dot?.message}>
          <Input
            autoFocus
            placeholder="Name"
            {...register('dot')}
          />
        </Field>
      </DialogBody>

      <DialogFooter>
        <Button
          loading={isSubmitting}
          type="submit"
        >
          Create
        </Button>
      </DialogFooter>
      <DialogCloseTrigger />
    </form>
  );
};

export const CreateDotForm = React.memo(React.forwardRef(CreateDotFormComponent));
