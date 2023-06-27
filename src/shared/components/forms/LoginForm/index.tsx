import {
  Box,
  Input,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  VStack,
  InputGroup,
  Icon,
  IconButton,
  InputRightElement,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';
import React from 'react';
import { useFormik } from 'formik';
import { MdClose } from 'react-icons/md';
import { object, string } from 'zod';
import { toFormikValidate } from 'zod-formik-adapter';

type Props = {
  onSubmit: (submit: { email: string, code: string }) => void,
  isLoading?: boolean,
}

const schema = object({
  email: string().email('Please enter a valid email'),
});

export const LoginForm = ({ onSubmit, isLoading }: Props) => {
  const [isEmailSubmitted, setIsEmailSubmitted] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      code: '',
    },
    onSubmit: (values, { setSubmitting }) => {
      setIsEmailSubmitted(true);
      onSubmit(values);
    },
    validate: toFormikValidate(schema),
    validateOnChange: false,
  });

  const handleEmailChange = React.useCallback((e) => {
    if (isEmailSubmitted) {
      setIsEmailSubmitted(false);
    }

    formik.handleChange(e);
  }, [isEmailSubmitted, formik]);

  const handleEmailReset = React.useCallback(() => {
    formik.setFieldValue('email', '');
    setIsEmailSubmitted(false);
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
            {!formik.errors.email && isEmailSubmitted && <FormHelperText>We sent verification code to your email</FormHelperText>}
            {!!formik.errors.email && <FormErrorMessage>{formik.errors.email}</FormErrorMessage>}
          </FormControl>
          {
            isEmailSubmitted && (
              <FormControl>
                <FormLabel htmlFor="password">Code</FormLabel>
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
            disabled={isLoading}
          >
            {isEmailSubmitted ? 'Continue with login code' : 'Login / Register'}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};
