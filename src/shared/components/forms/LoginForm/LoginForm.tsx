import React from 'react';

import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  VStack,
  InputGroup,
  IconButton,
  InputRightElement,
  FormErrorMessage,
  FormHelperText,
  Text,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { MdClose } from 'react-icons/md';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { object, string } from 'zod';
import { toFormikValidate } from 'zod-formik-adapter';

import { loginEmail, loginEmailWithCode } from 'shared/actions/auth';
import { loaderIds } from 'shared/constants/loaderIds';
import { BACK_URL } from 'shared/constants/queryParams';
import { routeNames } from 'shared/constants/routeNames';
import { getApiError } from 'shared/helpers/api/getApiError';
import { useLoaders } from 'shared/modules/loaders/hooks/useLoaders';
import { useAppDispatch } from 'shared/store/hooks';
import { buildUrl } from 'shared/util/router/buildUrl';

const schema = object({
  email: string().email('Enter a valid email'),
});

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const isLoading = useLoaders([loaderIds.loginEmail, loaderIds.loginEmailWithCode]);
  const [isEmailSent, setIsEmailSent] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSubmit = React.useCallback(async ({ email, code }) => {
    setError(null);
    if (code && email) {
      try {
        await dispatch(loginEmailWithCode({ email, code }));
        const backUrl = searchParams.get(BACK_URL) || buildUrl({ routeName: routeNames.app });

        navigate(backUrl);
      } catch (e) {
        setError(getApiError(e));
      }
      return;
    }

    if (email) {
      try {
        await dispatch(loginEmail(email));
        setIsEmailSent(true);
      } catch (e) {
        setError(getApiError(e));
      }
    }
  }, [dispatch, navigate, searchParams]);

  const formik = useFormik({
    initialValues: {
      email: '',
      code: '',
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validate: (values) => {
      setError(null);
      return toFormikValidate(schema)(values);
    },
    validateOnChange: false,
  });

  const handleEmailChange = React.useCallback((e) => {
    formik.setFieldValue('code', '');

    if (isEmailSent) {
      setIsEmailSent(false);
    }

    formik.handleChange(e);
  }, [formik, isEmailSent]);

  const handleEmailReset = React.useCallback(() => {
    formik.setFieldValue('email', '');
    formik.setFieldValue('code', '');
    setIsEmailSent(false);
  }, [formik]);

  return (
    <Box
      bg="white"
      p={6}
      rounded="md"
    >
      <form onSubmit={formik.handleSubmit}>
        <VStack
          spacing={4}
          align="flex-start"
        >
          <FormControl
            isInvalid={!!formik.errors.email}
          >
            <FormLabel htmlFor="email">Email</FormLabel>
            <InputGroup>
              <Input
                id="email"
                name="email"
                variant="filled"
                placeholder="Your email address"
                onChange={handleEmailChange}
                value={formik.values.email}
              />
              {
                formik.values.email && (
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
            {!formik.errors.email && isEmailSent && (
              <FormHelperText>We sent verification code to your email</FormHelperText>
            )}
            {!!formik.errors.email && <FormErrorMessage>{formik.errors.email}</FormErrorMessage>}
          </FormControl>
          {
            isEmailSent && (
              <FormControl>
                <FormLabel htmlFor="code">Code</FormLabel>
                <Input
                  id="code"
                  name="code"
                  variant="filled"
                  onChange={formik.handleChange}
                  value={formik.values.code}
                />
              </FormControl>
            )
          }
          <Button
            type="submit"
            colorScheme="purple"
            width="full"
            isLoading={isLoading}
          >
            {isEmailSent ? 'Continue with login code' : 'Login / Register'}
          </Button>
        </VStack>
        {error && (
          <Text
            color="red.11"
            textAlign="center"
            display="block"
            mt="2"
          >
            {error}
          </Text>
        )}
      </form>
    </Box>
  );
};
