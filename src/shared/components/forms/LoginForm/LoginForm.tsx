import {
  Box,
  Input,
  VStack
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useSearch } from '@tanstack/react-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import store2 from 'store2';
import * as z from 'zod';

import { useLoginEmail } from 'shared/api/hooks/useLoginEmail';
import { useSendCodeEmail } from 'shared/api/hooks/useSendCodeEmail';
import {
  Form,
  FormControl,
  FormError,
  FormField,
} from 'shared/components/Form';
import { handleFormApiErrors } from 'shared/components/Form/util';
import { Button } from 'shared/components/ui/button';
import { localStorageKeys } from 'shared/constants/localStorageKeys';
import { BACK_URL } from 'shared/constants/queryKeys';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  code: z.string(),
  referralCode: z.string(),
});

type FormValues = z.infer<typeof schema>

const defaultValues: Partial<FormValues> = {
  email: '',
  code: '',
  referralCode: store2.get(localStorageKeys.REFERRAL_CODE) || '',
};

export const EmailForm = () => {
  const [isEmailSent, setIsEmailSent] = React.useState(false);
  const [showReferralField, setShowReferralField] = React.useState(false);
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
    getValues,
    setValue,
    setError,
  } = form;
  console.log('formState', getValues(), isEmailSent);

  const handleEmailChange = React.useCallback((e) => {
    if (isEmailSent) {
      setIsEmailSent(false);
    }

    setValue('code', '', { shouldDirty: false });
    setValue('email', e.target.value.toLowerCase(), { shouldDirty: true });
  }, [isEmailSent, setValue]);

  const onSubmit = React.useCallback(async ({ email, code, referralCode }) => {
    if (code && email) {
      try {
        await loginEmail({ email, code, referralCode: referralCode });
        const to = backUrl || '/app';
        navigate({ to });
        store2.remove(localStorageKeys.REFERRAL_CODE);
      } catch (error) {
        handleFormApiErrors(setError, error);
      }
      return;
    }

    if (!isEmailSent && email) {
      try {
        const result = await sendCodeEmail(email);
        if (result.needReferral) {
          setShowReferralField(true);
        }
        setIsEmailSent(true);
      } catch (error) {
        handleFormApiErrors(setError, error);
      }
    }
  }, [loginEmail, isEmailSent, sendCodeEmail, navigate, backUrl, setError]);

  return (
    <Box
      py={6}
      rounded="md"
    >
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack
            gap={4}
            alignItems="stretch"
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
            {showReferralField && (
              <FormField
                control={form.control}
                name="referralCode"
                render={({ field }) => (
                  <FormControl 
                    label="Referral code"
                    helperText="During the pre-alpha phase, you need a referral code to enter"
                  >
                    <Input {...field} />
                  </FormControl>
                )}
              />
            )}
            <FormError />
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

export const LoginForm = () => {
  const [emailSent, setEmailSent] = React.useState(false);

  return <EmailForm />;
};