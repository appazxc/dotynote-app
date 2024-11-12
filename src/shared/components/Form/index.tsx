import * as React from 'react';
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

import { Field, FieldProps } from 'shared/components/ui/field';

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName,
  id: string
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
  const id = React.useId();

  return (
    <FormFieldContext.Provider value={{ name: props.name, id }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { id, name } = fieldContext;

  return {
    id,
    name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

const FormControl: React.FC<React.PropsWithChildren<FieldProps>> = 
  React.forwardRef<React.ElementRef<typeof Field>, FieldProps>(({ ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
    const errorText = error ? String(error?.message) : props.errorText;

    return (
      <Field
        ref={ref}
        id={formItemId}
        aria-describedby={
          !error
            ? `${formDescriptionId}`
            : `${formDescriptionId} ${formMessageId}`
        }
        invalid={!!error}
        errorText={errorText}
        {...props}
      />
    );
  });
FormControl.displayName = 'FormControl';

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
  FormControl,
  FormField,
  useForm,
};