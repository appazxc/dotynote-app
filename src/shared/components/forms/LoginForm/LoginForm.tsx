import React from 'react';

import {
  Box,
  Button,
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

import { useLoginEmail } from 'shared/api/hooks/useLoginEmail';
import { useSendCodeEmail } from 'shared/api/hooks/useSendCodeEmail';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'shared/components/Form';
import { Menu, MenuItem, MenuList, MenuTrigger } from 'shared/components/Menu';
import { BACK_URL } from 'shared/constants/queryParams';
import { routeNames } from 'shared/constants/routeNames';
import { getApiError } from 'shared/helpers/api/getApiError';
import { buildUrl } from 'shared/util/router/buildUrl';

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
  const [searchParams] = useSearchParams();
  const { mutateAsync: sendCodeEmail } = useSendCodeEmail();
  const { mutateAsync: loginEmail } = useLoginEmail();

  const form = useForm<FormValues>({ 
    defaultValues,
    resolver: zodResolver(schema), 
  });

  const {
    handleSubmit,
    formState: { dirtyFields, isSubmitting },
    setValue,
    setError,
    reset,
  } = form;

  const handleEmailChange = React.useCallback((e) => {
    if (isEmailSent) {
      setIsEmailSent(false);
    }
    
    setValue('code', '', { shouldDirty: false });
    setValue('email', e.target.value, { shouldDirty: true });
  }, [isEmailSent, setValue]);

  const handleEmailReset = React.useCallback(() => {
    reset(defaultValues);
    setIsEmailSent(false);
  }, [reset]);

  const onSubmit = React.useCallback(async ({ email, code }) => {
    if (code && email) {
      try {
        await loginEmail({ email, code });
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
        await sendCodeEmail(email);
        setIsEmailSent(true);
      } catch (e) {
        setError('email', {
          message: getApiError(e).message,
        });
      }
    }
  }, [loginEmail, sendCodeEmail, navigate, searchParams, setError]);

  return (
    <Box
      bg="white"
      p={6}
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
                  <FormItem>
                    <FormControl>
                      <FormLabel>Email</FormLabel>
                      <InputGroup>
                        <Input
                          variant="filled"
                          placeholder="Your email address"
                          {...field}
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
                      {isEmailSent && (
                        <FormDescription>We sent verification code to your email</FormDescription>
                      )}
                      <FormMessage />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            {isEmailSent && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FormLabel>Code</FormLabel>
                      <Input variant="filled" {...field} />
                      <FormMessage />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
            <Menu isContextMenu>
              <MenuTrigger
                as={Button}
                type="submit"
                colorScheme="brand"
                width="full"
                isLoading={isSubmitting}
              >
                {isEmailSent ? 'Continue with login code' : 'Login / Register'}
              </MenuTrigger>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    console.log('hello item');
                  
                  }}
                >hello</MenuItem>
                <MenuItem>hello2</MenuItem>
              </MenuList>
            </Menu>
          </VStack>
        </form>
      </Form>
    </Box>
  );
};
