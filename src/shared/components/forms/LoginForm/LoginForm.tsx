import {
  Box,
  Field,
  Input,
  VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from '@tanstack/react-form';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { c } from 'node_modules/msw/lib/glossary-2792c6da';
import React from 'react';
import store2 from 'store2';
import * as z from 'zod';

import { useLoginEmail } from 'shared/api/hooks/useLoginEmail';
import { useSendCodeEmail } from 'shared/api/hooks/useSendCodeEmail';
import { handleFormApiErrors } from 'shared/components/Form/util';
import { Button } from 'shared/components/ui/button';
import { localStorageKeys } from 'shared/constants/localStorageKeys';
import { BACK_URL } from 'shared/constants/queryKeys';

const schema = (isEmailSent: boolean) => z.object({
  email: z.string().email('Enter a valid email'),
  code: isEmailSent ? z.string().min(4, 'Code must be at least 4 characters') : z.string(),
  referralCode: z.string(),
});

type FormValues = z.infer<ReturnType<typeof schema>>

const defaultValues: Partial<FormValues> = {
  email: '',
  code: '',
  referralCode: store2.get(localStorageKeys.REFERRAL_CODE) || '',
};

export const LoginForm = () => {
  const [isEmailSent, setIsEmailSent] = React.useState(false);
  const [showReferralField, setShowReferralField] = React.useState(false);
  const navigate = useNavigate();
  const backUrl = useSearch({ strict: false })[BACK_URL];
  const { mutateAsync: sendCodeEmail } = useSendCodeEmail();
  const { mutateAsync: loginEmail } = useLoginEmail();

  const { Field: FormField, handleSubmit: formHandleSubmit, setFieldValue, ...rest } = useForm({ 
    defaultValues,
    validators: {
      onSubmit: schema(isEmailSent),
    },
    onSubmit: (data) => {
      console.log('data', data);
    },
  }); 

  const handleEmailChange = React.useCallback((e) => {
    if (isEmailSent) {
      setIsEmailSent(false);
    }

    setFieldValue('code', '');
    setFieldValue('email', e.target.value.toLowerCase(), { dontUpdateMeta: false });
  }, [isEmailSent, setFieldValue]);

  // const onSubmit = React.useCallback(async ({ email, code, referralCode }) => {
  //   if (code && email) {
  //     try {
  //       await loginEmail({ email, code, referralCode: referralCode });
  //       const to = backUrl || '/app';
  //       navigate({ to });
  //       store2.remove(localStorageKeys.REFERRAL_CODE);
  //     } catch (error) {
  //       handleFormApiErrors(setError, error);
  //     }
  //     return;
  //   }

  //   if (!isEmailSent && email) {
  //     try {
  //       const result = await sendCodeEmail(email);
  //       if (result.needReferral) {
  //         setShowReferralField(true);
  //       }
  //       setIsEmailSent(true);
  //     } catch (error) {
  //       handleFormApiErrors(setError, error);
  //     }
  //   }
  // }, [loginEmail, isEmailSent, sendCodeEmail, navigate, backUrl, setError]);

  return (
    <Box py={6} rounded="md">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          formHandleSubmit();
        }}
      >
        <VStack
          gap={4}
          alignItems="stretch"
        >
          <FormField
            children={(field) => {

              return (
                <Field.Root invalid={field.state.meta.errors.length > 0}>
                  <Field.Label>Email</Field.Label>
                  <Input
                    placeholder="Your email address"
                    spellCheck="false"
                    value={field.state.value}
                    onChange={handleEmailChange}
                  />
                  <Field.ErrorText>{field.state.meta.errors[0]?.message}</Field.ErrorText>
                </Field.Root>
              );
            }}
            name="email"
          />
            
          <FormField
            children={(field) => (
              <Field.Root invalid={field.state.meta.errors.length > 0}>
                <Field.Label>Code</Field.Label>
                <Input value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
              </Field.Root>
            )}
            name="code"
          />

          {showReferralField && (
            <FormField
              children={(field) => (
                <Field.Root invalid={field.state.meta.errors.length > 0}>
                  <Field.Label>Referral code</Field.Label>
                  <Input value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
                  <Field.HelperText>During the pre-alpha phase, you need a referral code to enter</Field.HelperText>
                </Field.Root>
              )}
              name="referralCode"
            />
          )}

          <rest.Subscribe
            selector={(state) => [state.isSubmitting]}
            children={([isSubmitting]) => (
              <Button
                type="submit"
                colorScheme="brand"
                width="full"
                size="md"
                loading={isSubmitting}
              >
                Continue
              </Button>
            )}
          />

        </VStack>
      </form>
    </Box>
  );
};