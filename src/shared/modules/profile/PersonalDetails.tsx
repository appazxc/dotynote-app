import React from 'react';

import { Box, BoxProps, Button, Heading, Input, InputGroup } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from 'shared/components/Form';
import { PersonalDetailsSection } from 'shared/modules/profile/PersonalDetailsSection';
import { selectUser } from 'shared/selectors/auth/selectUser';
import { useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

type Props = {} & BoxProps;

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  nickname: z.string(),
  username: z.string(),
});

type FormValues = z.infer<typeof schema>

export const PersonalDetails = React.memo(({ ...boxProps }: Props) => {
  const user = useAppSelector(selectUser);

  invariant(user, 'Missing user');

  const form = useForm<FormValues>({ 
    defaultValues: {
      email: user.email,
      nickname: user.nickname || '',
      username: user.username || '',
    },
    resolver: zodResolver(schema), 
  });
  
  if (!user) {
    return null;
  }
  
  return (
    <Box {...boxProps}>
      <Heading
        as="h2"
        size="lg"
        mb="4"
      >
        Personal details
      </Heading>
      <Form {...form}>
        <PersonalDetailsSection
          title="Name"
          description={{
            open: 'This will visible in notes.',
            close: user.nickname,
          }}
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
                      // onChange={handleEmailChange}
                    />
                    <FormMessage />
                    <Button
                      colorScheme="brand"
                      onClick={() => {}}
                      mt="4"
                    >Save</Button>  
                  </FormControl>
                </FormItem>
              );
            }}
          />
        </PersonalDetailsSection>
        <PersonalDetailsSection
          title="Username"
          description={{
            open: 'Users can find you with this name.',
            close: `@${user.username}`,
          }}
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
                    <Button
                      colorScheme="brand"
                      onClick={() => {}}
                      mt="4"
                    >Save</Button>  
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
