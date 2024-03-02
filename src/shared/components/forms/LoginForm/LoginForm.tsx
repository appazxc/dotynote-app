import React from 'react';

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { MdClose } from 'react-icons/md';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as z from 'zod';

import { loginEmail, loginEmailWithCode } from 'shared/actions/auth';
import { BACK_URL } from 'shared/constants/queryParams';
import { routeNames } from 'shared/constants/routeNames';
import { getApiError } from 'shared/helpers/api/getApiError';
import { useAppDispatch } from 'shared/store/hooks';
import { buildUrl } from 'shared/util/router/buildUrl';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  code: z.string(),
});

type FormValues = z.infer<typeof schema>

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const [isEmailSent, setIsEmailSent] = React.useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    handleSubmit,
    register,
    formState: { errors, dirtyFields, isSubmitting },
    setValue,
    setError,
    reset,
  } = useForm<FormValues>({ 
    resolver: zodResolver(schema), 
  });

  const handleEmailChange = React.useCallback((e) => {
    if (isEmailSent) {
      setIsEmailSent(false);
    }
    
    setValue('code', '', { shouldDirty: false });
    setValue('email', e.target.value, { shouldDirty: true });
  }, [isEmailSent, setValue]);

  const handleEmailReset = React.useCallback(() => {
    reset({
      code: '',
      email: '',
    });
    setIsEmailSent(false);
  }, [reset]);

  const onSubmit = React.useCallback(async ({ email, code }) => {
    if (code && email) {
      try {
        await dispatch(loginEmailWithCode({ email, code }));
        const backUrl = searchParams.get(BACK_URL) || buildUrl({ routeName: routeNames.app });

        navigate(backUrl);
      } catch (e) {
        setError('code', {
          message: getApiError(e).message,
        });
      }
      return;
    }

    if (email) {
      try {
        await dispatch(loginEmail(email));
        setIsEmailSent(true);
      } catch (e) {
        setError('email', {
          message: getApiError(e).message,
        });
      }
    }
  }, [dispatch, navigate, searchParams, setError]);

  return (
    <Box
      bg="white"
      p={6}
      rounded="md"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack
          spacing={4}
          align="flex-start"
        >
          <FormControl
            isInvalid={!!errors.email}
          >
            <FormLabel htmlFor="email">Email</FormLabel>
            <InputGroup>
              <Input
                variant="filled"
                placeholder="Your email address"
                {...register('email')}
                onChange={handleEmailChange}
              />
              {
                dirtyFields.email && (
                  <InputRightElement>
                    <IconButton
                      size="xs"
                      aria-label="close"
                      icon={<MdClose />}
                      borderRadius="50%"
                      onClick={handleEmailReset}
                    />
                  </InputRightElement>
                )
              }
            </InputGroup>
            {!errors.email && isEmailSent && (
              <FormHelperText>We sent verification code to your email</FormHelperText>
            )}
            {!!errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>}
          </FormControl>
          {
            isEmailSent && (
              <FormControl isInvalid={!!errors.code}>
                <FormLabel htmlFor="code">Code</FormLabel>
                <Input
                  id="code"
                  variant="filled"
                  {...register('code')}
                />
                {!!errors.code && <FormErrorMessage>{errors.code.message}</FormErrorMessage>}
              </FormControl>
            )
          }
          <Button
            type="submit"
            colorScheme="brand"
            width="full"
            isLoading={isSubmitting}
          >
            {isEmailSent ? 'Continue with login code' : 'Login / Register'}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};
