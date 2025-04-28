import {
  Box,
  Input,
  VStack,
  Text,
} from '@chakra-ui/react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import React from 'react';
import store2 from 'store2';
import * as z from 'zod';

import { useLoginEmail } from 'shared/api/hooks/useLoginEmail';
import { useSendCodeEmail } from 'shared/api/hooks/useSendCodeEmail';
import { useAppForm } from 'shared/components/Form';
import { handleFormApiErrors } from 'shared/components/Form/util';
import { Button } from 'shared/components/ui/button';
import { localStorageKeys } from 'shared/constants/localStorageKeys';
import { BACK_URL } from 'shared/constants/queryKeys';

const schema = (isEmailSent: boolean) => z.object({
  email: z.string().email('Enter a valid email'),
  code: isEmailSent ? z.string().min(4, 'Code must be at least 4 characters') : z.string(),
  referralCode: z.string(),
});

const defaultValues = {
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
  const { AppField, AppForm, Subscribe, FormError, handleSubmit, resetField, ...rest } = useAppForm({ 
    defaultValues,
    validators: {
      onSubmit: schema(isEmailSent),
    },
    onSubmit: async ({ value: { email, code, referralCode }, formApi }) => {
      if (code && email) {
        try {
          await loginEmail({ email, code, referralCode: referralCode });
          const to = backUrl || '/app';
          navigate({ to });
          store2.remove(localStorageKeys.REFERRAL_CODE);
        } catch (error) {
          handleFormApiErrors(formApi, error);
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
          handleFormApiErrors(formApi, error);
        }
      }
    },
  }); 
  const handleChangeEmailClick = React.useCallback(() => {
    setIsEmailSent(false);
    setShowReferralField(false);
    resetField('code');
    resetField('referralCode');
  }, [resetField]);

  return (
    <Box py={6} rounded="md">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleSubmit();
        }}
      >
        <AppForm>
          <VStack gap={4} alignItems="stretch">
            <AppField
              name="email"
              children={(field) => {
                return (
                  <field.Field label="Email" position="relative">
                    {isEmailSent && (
                      <Text
                        position="absolute"
                        top="2"
                        right={0}
                        color="fg.subtle"
                        fontSize="xs"
                        textDecoration="underline"
                        cursor="pointer"
                        onClick={handleChangeEmailClick}
                      >
                      Change
                      </Text>
                    )}
                    <Input
                      placeholder="Your email address"
                      spellCheck="false"
                      value={field.state.value}
                      disabled={isEmailSent}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </field.Field>
                );
              }}
            />
            {isEmailSent && (
              <AppField
                name="code"
                children={(field) => {
                  return (
                    <field.Field label="Code">
                      <Input value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
                    </field.Field>
                  );
                }}
              />
            )}
            {showReferralField && (
              <AppField
                name="referralCode"
                children={(field) => (
                  <field.Field 
                    label="Referral code" 
                    helperText="During the pre-alpha phase, you need a referral code to enter"
                  >
                    <Input value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
                  </field.Field>
                )}
              />
            )}
            <FormError />
            <Subscribe
              selector={(state) => [state.isSubmitting]}
              children={([isSubmitting]) => {
                return (
                  <Button
                    type="submit"
                    colorScheme="brand"
                    width="full"
                    size="md"
                    loading={isSubmitting}
                  >
                    Continue
                  </Button>
                );
              }}
            />
          </VStack>
        </AppForm>
      </form>
    </Box>
  );
};