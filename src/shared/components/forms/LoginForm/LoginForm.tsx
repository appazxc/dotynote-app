import React from 'react';

import {
  Box,
  Button,
  Input,
  VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useLoginEmail } from 'shared/api/hooks/useLoginEmail';
import { useSendCodeEmail } from 'shared/api/hooks/useSendCodeEmail';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
} from 'shared/components/Form';
import { BACK_URL } from 'shared/constants/queryKeys';
import { getApiError } from 'shared/helpers/api/getApiError';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  code: z.string(),
});

type FormValues = z.infer<typeof schema>

const defaultValues: Partial<FormValues> = {
  email: '',
  code: '',
};

export const LoginForm = () => {
  const [isEmailSent, setIsEmailSent] = React.useState(false);
  const navigate = useNavigate();
  const backUrl = useSearch({ strict: false })[BACK_URL];
  const { mutateAsync: sendCodeEmail } = useSendCodeEmail();
  const { mutateAsync: loginEmail } = useLoginEmail();

  const form = useForm<FormValues>({ 
    defaultValues,
    resolver: zodResolver(schema), 
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    setError,
  } = form;

  const handleEmailChange = React.useCallback((e) => {
    if (isEmailSent) {
      setIsEmailSent(false);
    }

    setValue('code', '', { shouldDirty: false });
    setValue('email', e.target.value, { shouldDirty: true });
  }, [isEmailSent, setValue]);

  const onSubmit = React.useCallback(async ({ email, code }) => {
    if (code && email) {
      try {
        await loginEmail({ email, code });
        const to = backUrl || '/app';

        navigate({ to });
      } catch (e) {
        setError('code', {
          message: getApiError(e).message,
        });
      }
      return;
    }

    if (email) {
      try {
        await sendCodeEmail(email);
        setIsEmailSent(true);
      } catch (e) {
        setError('email', {
          message: getApiError(e).message || 'Error sending code',
        });
      }
    }
  }, [loginEmail, sendCodeEmail, navigate, backUrl, setError]);

  return (
    <Box
      bg="white"
      py={6}
      rounded="md"
    >
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack
            spacing={4}
            align="flex-start"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                      placeholder="Your email address"
                      {...field}
                      onChange={handleEmailChange}
                    />
                    {isEmailSent && (
                      <FormDescription>We sent verification code to your email</FormDescription>
                    )}
                    <FormMessage />
                  </FormControl>
                );
              }}
            />
            {isEmailSent && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormControl>
                    <FormLabel>Code</FormLabel>
                    <Input {...field} />
                    <FormMessage />
                  </FormControl>
                )}
              />
            )}
            <Button
              type="submit"
              colorScheme="brand"
              width="full"
              size="md"
              isLoading={isSubmitting}
              isDisabled={isEmailSent && !form.getValues('code')}
            >
              Continue
            </Button>
          </VStack>
        </form>
      </Form>
    </Box>
  );
};
