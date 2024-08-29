import React from 'react';

import { Box, BoxProps, Text, Button, Heading, Input, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDebounce } from '@uidotdev/usehooks';
import isBoolean from 'lodash/isBoolean';
import { z } from 'zod';

import { useUpdateUser } from 'shared/api/hooks/useUpdateUser';
import { useUsernameCheck } from 'shared/api/hooks/useUsernameCheck';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from 'shared/components/Form';
import { handleFormApiErrors } from 'shared/components/Form/util';
import { PersonalDetailsSection } from 'shared/modules/profile/PersonalDetailsSection';
import { selectUser } from 'shared/selectors/auth/selectUser';
import { useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

type Props = {} & BoxProps;

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  nickname: z.string().min(3),
  username: z.string().min(3),
});

type FormValues = z.infer<typeof schema>

type FieldNames = keyof FormValues

type SectionRef = {
  close: () => void;
};

export const PersonalDetails = React.memo(({ ...boxProps }: Props) => {
  const user = useAppSelector(selectUser);
  const toast = useToast();

  const sectionRefs = React.useRef<{[key in FieldNames]?: SectionRef}>({});

  invariant(user, 'Missing user');

  const form = useForm<FormValues>({ 
    defaultValues: {
      email: user.email,
      nickname: user.nickname || '',
      username: user.username || '',
    },
    resolver: zodResolver(schema), 
  });
  const { dirtyFields } = form.formState;

  const { mutate, isPending } = useUpdateUser();
  
  const debouncedUsername = useDebounce(form.getValues('username'), 500);

  const { 
    data: usernameIsAvailable, 
    isFetching: isUsernameAvailableFetching, 
  } = useUsernameCheck(
    debouncedUsername, 
    { 
      enabled: !!debouncedUsername && debouncedUsername !== user.username && debouncedUsername.length >= 3,
      staleTime: 0,
    }
  );

  const closeSection = React.useCallback((fieldProp: FieldNames) => {
    sectionRefs.current[fieldProp]?.close();
  }, []);

  const handleSectionClose = React.useCallback((fieldProp: FieldNames) => () => {
    form.resetField(fieldProp);
  }, [form]);

  const submitField = React.useCallback((fieldProp: FieldNames) => async () => {
    const values = form.getValues();
    const value = values[fieldProp];

    form.clearErrors();

    const isSuccess = await form.trigger(fieldProp);

    if (!isSuccess) {
      return;
    }

    mutate({ [fieldProp]: value }, { 
      onError: (error) => {
        handleFormApiErrors(form, error);
      }, 
      onSuccess: () => {
        const fieldNameMap = {
          'nickname': 'Name',
          'username': 'Username',
          'email': 'Email',
        };

        toast({
          title: `${fieldNameMap[fieldProp]} updated`,
          status: 'success',
        });

        closeSection(fieldProp);
      },
    });
  }, [form, mutate, toast, closeSection]);

  if (!user) {
    return null;
  }

  const showUsernameAvailableMessage = 
    (form.getValues('username') !== user.username && isBoolean(usernameIsAvailable)) 
    || isUsernameAvailableFetching;
  const usernameAvailableText = isUsernameAvailableFetching 
    ? 'Checking...' 
    : usernameIsAvailable ? 'Username is available' : 'Username is not available';

  return (
    <Box {...boxProps}>
      <Heading
        as="h2"
        size="lg"
        mb="4"
        fontWeight="600"
      >
        Personal details
      </Heading>
      <Form {...form}>
        <PersonalDetailsSection
          ref={(el: SectionRef) => sectionRefs.current.nickname = el}
          title="Name"
          description={{
            open: 'This will visible in notes.',
            close: user.nickname,
          }}
          onClose={handleSectionClose('nickname')}
        >
          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input
                      variant="filled"
                      {...field}
                    />
                    <FormMessage />
                    <Button
                      colorScheme="brand"
                      onClick={submitField('nickname')}
                      mt="4"
                      isLoading={isPending}
                      isDisabled={!dirtyFields.nickname}
                    >
                      Save
                    </Button>  
                  </FormControl>
                </FormItem>
              );
            }}
          />
        </PersonalDetailsSection>
        <PersonalDetailsSection
          ref={(el: SectionRef) => sectionRefs.current.username = el}
          title="Username"
          description={{
            open: 'Users can find you with this name.',
            close: `@${user.username}`,
          }}
          onClose={handleSectionClose('username')}
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <FormLabel>Username</FormLabel>
                    <Input
                      variant="filled"
                      {...field}
                      // onChange={handleEmailChange}
                    />
                    <FormMessage />
                    {showUsernameAvailableMessage && (
                      <Text
                        mt="1"
                        fontSize="small"
                        color={isUsernameAvailableFetching ? 'blue.500' : usernameIsAvailable ? 'green' : 'tomato'}
                      >
                        {usernameAvailableText}
                      </Text>
                    )}
                    <Button
                      colorScheme="brand"
                      onClick={submitField('username')}
                      mt="4"
                      isLoading={isPending}
                      isDisabled={!dirtyFields.username}
                    >
                      Save
                    </Button>  
                  </FormControl>
                </FormItem>
              );
            }}
          />
        </PersonalDetailsSection>
        <PersonalDetailsSection
          title="Email address"
          description={{
            close: user.email,
          }}
        />
      </Form>
    </Box>
  );
});
