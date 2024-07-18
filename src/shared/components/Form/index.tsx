import * as React from 'react';

import { 
  FormControl as FormControlBase,
  FormLabel as FormLabelBase,
  FormErrorMessage,
  FormHelperText,
  FormHelperTextProps,
} from '@chakra-ui/react';
import { useForm as useFormBase } from 'react-hook-form';
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form';

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    ...props
  }: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

const FormItem: React.FC<React.PropsWithChildren> = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
// eslint-disable-next-line @typescript-eslint/no-unused-vars
>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      {props.children}
    </FormItemContext.Provider>
  );
});
FormItem.displayName = 'FormItem';

const FormControl: React.FC<React.PropsWithChildren> = React.forwardRef<
  React.ElementRef<typeof FormControlBase>,
  React.ComponentPropsWithoutRef<typeof FormControlBase>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <FormControlBase
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      isInvalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = 'FormControl';

const FormLabel: React.FC<React.PropsWithChildren> = React.forwardRef<
  React.ElementRef<typeof FormLabelBase>,
  React.ComponentPropsWithoutRef<typeof FormLabelBase>
>(({ className, ...props }, ref) => {
  const { formItemId } = useFormField();

  return (
    <FormLabelBase
      ref={ref}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = 'FormLabel';

const FormDescription: React.FC<React.PropsWithChildren> = React.forwardRef<
  React.ElementRef<typeof FormHelperText>,
  FormHelperTextProps & { visibleOnError?: boolean }
>(({ className, visibleOnError, ...props }, ref) => {
  const { formDescriptionId, error } = useFormField();

  return (
    error && !visibleOnError ? null : (
      <FormHelperText
        ref={ref}
        id={formDescriptionId}
        {...props}
      />
    )
  );
});
FormDescription.displayName = 'FormDescription';

const FormMessage: React.FC<React.PropsWithChildren> = React.forwardRef<
  React.ElementRef<typeof FormErrorMessage>,
  React.ComponentPropsWithoutRef<typeof FormErrorMessage>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <FormErrorMessage
      ref={ref}
      id={formMessageId}
      {...props}
    >
      {body}
    </FormErrorMessage>
  );
});
FormMessage.displayName = 'FormMessage';

// https://github.com/orgs/react-hook-form/discussions/9472
const useForm = <FormState extends FieldValues>(props: UseFormProps<FormState>) => {
  const form = useFormBase<FormState>(props);

  const handleDirtySubmit = React.useCallback<
    UseFormReturn<Partial<FormState>>['handleSubmit']
  >(
    (onSubmit) => {
      function getDirtyFields(dirtyFields, formValues) {
        if (typeof dirtyFields !== 'object' || dirtyFields === null || !formValues) {
          return {};
        }
      
        return Object.keys(dirtyFields).reduce((accumulator, key) => {
          const isDirty = dirtyFields[key];
          const value = formValues[key];
      
          // If it's an array, apply the logic recursively to each item
          if (Array.isArray(isDirty)) {
            // eslint-disable-next-line no-underscore-dangle
            const _dirtyFields = isDirty.map((item, index) => getDirtyFields(item, value[index]));
            if (_dirtyFields.length > 0) {
              // eslint-disable-next-line no-param-reassign
              accumulator[key] = _dirtyFields;
            }
          }
          // If it's an object, apply the logic recursively
          else if (typeof isDirty === 'object' && isDirty !== null) {
            // eslint-disable-next-line no-param-reassign
            accumulator[key] = getDirtyFields(isDirty, value);
          }
          // If it's a dirty field, get the value from formValues
          else if (isDirty) {
            // eslint-disable-next-line no-param-reassign
            accumulator[key] = value;
          }
      
          return accumulator;
        }, {});
      }

      return form.handleSubmit(async () => {
        const {
          formState: { dirtyFields },
          getValues,
        } = form;

        await onSubmit(getDirtyFields(dirtyFields, getValues()));
      });
    },
    [form]
  );

  return {
    ...form,
    handleDirtySubmit,
  };
};

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormField,
  FormMessage,
  FormDescription,
  useForm,
};