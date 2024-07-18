import React from 'react';

import {
  Box,
  Button,
  Input,
  InputGroup,
  VStack,
  Text,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDebounce } from '@uidotdev/usehooks';
import isBoolean from 'lodash/isBoolean';
import * as z from 'zod';

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
import { selectUser } from 'shared/selectors/auth/selectUser';
import { useAppSelector } from 'shared/store/hooks';
import { UserEntity } from 'shared/types/entities/UserEntity';
import { invariant } from 'shared/util/invariant';

const MIN_NAME_LENGTH = 3;

const schema = z.object({
  nickname: z.union([z.string().min(MIN_NAME_LENGTH), z.literal('')]),
  username: z.union([z.string().min(MIN_NAME_LENGTH), z.literal('')]),
});

type FormValues = z.infer<typeof schema>

const defaultValues = (user: UserEntity): Partial<FormValues> => ({
  nickname: user.nickname || '',
  username: user.username || '',
});

export const ProfileForm = React.memo(() => {
  const user = useAppSelector(selectUser);

  invariant(user, 'Missing user');

  const form = useForm<FormValues>({ 
    defaultValues: defaultValues(user),
    resolver: zodResolver(schema), 
  });
  
  const {
    handleDirtySubmit,
    formState: { dirtyFields, isSubmitting },
    watch,
    reset,
  } = form;

  watch('username');

  const debouncedUsername = useDebounce(form.getValues('username'), 500);
  
  const { data: usernameIsAvailable, isFetching: isUsernameAvailableFetching } = useUsernameCheck(
    debouncedUsername!, 
    { enabled: !!debouncedUsername && debouncedUsername !== user.username && debouncedUsername.length >= 3 }
  );

  const { mutateAsync } = useUpdateUser();

  const onSubmit = React.useCallback(async (fields) => {
    if (isUsernameAvailableFetching) {
      return;
    }
    
    await mutateAsync(fields);

    reset(fields);
  }, [mutateAsync, isUsernameAvailableFetching, reset]);

  const showUsernameAvailableMessage = 
    (form.getValues('username') !== user.username && isBoolean(usernameIsAvailable)) 
    || isUsernameAvailableFetching;
  const usernameAvailableText = isUsernameAvailableFetching 
    ? 'Checking...' 
    : usernameIsAvailable ? 'Username is available' : 'Username is not available';
  const canSubmit = Object.keys(dirtyFields).length > 0;

  return (
    <Box>
      <Form {...form}>
        <form onSubmit={handleDirtySubmit(onSubmit)}>
          <VStack
            spacing={4}
            align="flex-start"
          >
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                isDisabled
                variant="filled"
                value={user.email}
                
              />
            </FormControl>
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
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <FormLabel>Username</FormLabel>
                      <InputGroup>
                        <Input
                          variant="filled"
                          {...field}
                        />
                      </InputGroup>
                      
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
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            {canSubmit && (
              <Button
                type="submit"
                colorScheme="brand"
                width="full"
                mt="4"
                isLoading={isSubmitting}
              >
                Save
              </Button>
            )}
          </VStack>
        </form>
      </Form>
    </Box>
  );
});
