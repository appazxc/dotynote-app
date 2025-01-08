import {
  Box,
  Input,
  VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useSearch } from '@tanstack/react-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useLoginEmail } from 'shared/api/hooks/useLoginEmail';
import { useSendCodeEmail } from 'shared/api/hooks/useSendCodeEmail';
import {
  Form,
  FormControl,
  FormField,
} from 'shared/components/Form';
import { Button } from 'shared/components/ui/button';
import { BACK_URL } from 'shared/constants/queryKeys';
import { parseApiError } from 'shared/helpers/api/getApiError';

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
    setValue('email', e.target.value.toLowerCase(), { shouldDirty: true });
  }, [isEmailSent, setValue]);

  const onSubmit = React.useCallback(async ({ email, code }) => {
    if (code && email) {
      try {
        await loginEmail({ email, code });
        const to = backUrl || '/app';

        navigate({ to });
      } catch (e) {
        setError('code', {
          message: parseApiError(e).message,
        });
      }
      return;
    }

    if (!isEmailSent && email) {
      try {
        await sendCodeEmail(email);
        setIsEmailSent(true);
      } catch (e) {
        setError('email', {
          message: parseApiError(e).message || 'Error sending code',
        });
      }
    }
  }, [loginEmail, isEmailSent, sendCodeEmail, navigate, backUrl, setError]);

  return (
    <Box
      bg="white"
      py={6}
      rounded="md"
    >
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack
            gap={4}
            align="flex-start"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormControl 
                    label="Email" 
                    helperText={isEmailSent ? 'We sent verification code to your email' : undefined}
                  >
                    <Input
                      placeholder="Your email address"
                      spellCheck="false"
                      {...field}
                      onChange={handleEmailChange}
                    />
                  </FormControl>
                );
              }}
            />
            {isEmailSent && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormControl label="Code">
                    <Input {...field} />
                  </FormControl>
                )}
              />
            )}
            <Button
              type="submit"
              colorScheme="brand"
              width="full"
              size="md"
              loading={isSubmitting}
              // disabled={isEmailSent && !form.getValues('code')}
            >
              Continue
            </Button>
          </VStack>
        </form>
      </Form>
    </Box>
  );
};
