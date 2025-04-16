import { Box, BoxProps, Heading } from '@chakra-ui/react';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useDebounce } from '@uidotdev/usehooks';
// import isBoolean from 'lodash/isBoolean';
import React from 'react';
// import { z } from 'zod';

// import { useUpdateUser } from 'shared/api/hooks/useUpdateUser';
// import { useUsernameCheck } from 'shared/api/hooks/useUsernameCheck';
// import {
//   Form,
//   FormControl,
//   FormField,
//   useForm,
// } from 'shared/components/Form';
// import { handleFormApiErrors } from 'shared/components/Form/util';
// import { Button } from 'shared/components/ui/button';
// import { InputGroup } from 'shared/components/ui/input-group';
// import { toaster } from 'shared/components/ui/toaster';
import { PersonalDetailsSection } from 'shared/modules/profile/PersonalDetailsSection';
import { selectUser } from 'shared/selectors/auth/selectUser';
import { useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

type Props = BoxProps;

// const schema = z.object({
//   email: z.string().email('Enter a valid email'),
//   nickname: z.string().min(3),
//   username: z.string().min(3),
// });

// type FormValues = z.infer<typeof schema>

// type FieldNames = keyof FormValues

export type SectionRef = {
  close: () => void;
};

export const PersonalDetails = React.memo(({ ...boxProps }: Props) => {
  const user = useAppSelector(selectUser);

  // const sectionRefs = React.useRef<{[key in FieldNames]?: SectionRef}>({});

  invariant(user, 'Missing user');

  // const form = useForm<FormValues>({ 
  //   defaultValues: {
  //     email: user.email,
  //     nickname: user.nickname || '',
  //     username: user.username || '',
  //   },
  //   resolver: zodResolver(schema), 
  // });
  // const { dirtyFields } = form.formState;

  // const { mutate, isPending } = useUpdateUser();
  
  // form.watch('username');
  
  // const debouncedUsername = useDebounce(form.getValues('username'), 500);

  // const { 
  //   data: usernameIsAvailable, 
  //   isFetching: isUsernameAvailableFetching, 
  // } = useUsernameCheck(
  //   debouncedUsername, 
  //   { 
  //     enabled: !!debouncedUsername && debouncedUsername !== user.username && debouncedUsername.length >= 3,
  //     staleTime: 0,
  //   }
  // );

  // const closeSection = React.useCallback((fieldProp: FieldNames) => {
  //   sectionRefs.current[fieldProp]?.close();
  // }, []);

  // const handleSectionClose = React.useCallback((fieldProp: FieldNames) => () => {
  //   form.resetField(fieldProp);
  // }, [form]);

  // const submitField = React.useCallback((fieldProp: FieldNames) => async () => {
  //   const values = form.getValues();
  //   const value = values[fieldProp];

  //   form.clearErrors();

  //   const isSuccess = await form.trigger(fieldProp);

  //   if (!isSuccess) {
  //     return;
  //   }

  //   mutate({ [fieldProp]: value }, { 
  //     onError: (error) => {
  //       handleFormApiErrors(form.setError, error);
  //     }, 
  //     onSuccess: () => {
  //       const fieldNameMap = {
  //         'nickname': 'Name',
  //         'username': 'Username',
  //         'email': 'Email',
  //       };

  //       form.resetField(fieldProp, { defaultValue: value });

  //       toaster.create({
  //         description: `${fieldNameMap[fieldProp]} updated`,
  //       });

  //       closeSection(fieldProp);
  //     },
  //   });
  // }, [form, mutate, closeSection]);

  if (!user) {
    return null;
  }

  // const showUsernameAvailableMessage = 
  //   (form.getValues('username') !== user.username && isBoolean(usernameIsAvailable)) 
  //   || isUsernameAvailableFetching;
  // const usernameAvailableText = isUsernameAvailableFetching 
  //   ? 'Checking...' 
  //   : usernameIsAvailable ? 'Username is available' : 'Username is not available';

  return (
    <Box {...boxProps}>
      <Heading
        as="h2"
        size="2xl"
        mb="2"
        fontWeight="600"
      >
        Personal details
      </Heading>
      {/* <Form {...form}> */}
      {/* <PersonalDetailsSection
          ref={(el: SectionRef) => {
            sectionRefs.current.nickname = el;
          }}
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
                <Box>
                  <FormControl label="Name">
                    <Input {...field} variant="subtle" />
                  </FormControl>
                  <Button
                    mt="4"
                    loading={isPending}
                    disabled={!dirtyFields.nickname}
                    onClick={submitField('nickname')}
                  >
                    Save
                  </Button>  
                </Box>
                
              );
            }}
          />
        </PersonalDetailsSection>
        <PersonalDetailsSection
          ref={(el: SectionRef) => {
            sectionRefs.current.username = el;
          }}
          title="Username"
          description={{
            open: 'Users can find you with this name.',
            close: `@${user.username || ''}`,
          }}
          onClose={handleSectionClose('username')}
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => {
              return (
                <Box>
                  <FormControl
                    label="Username"
                    helperText={showUsernameAvailableMessage && (
                      <Text
                        mt="1"
                        fontSize="small"
                        color={isUsernameAvailableFetching ? 'blue.500' : usernameIsAvailable ? 'green' : 'tomato'}
                      >
                        {usernameAvailableText}
                      </Text>
                    )}
                  >
                    <InputGroup w="full" startElement={<Text fontSize="lg">@</Text>}>
                      <Input {...field} variant="subtle" />
                    </InputGroup>
                  </FormControl>
                  <Button
                    mt="4"
                    loading={isPending}
                    disabled={!dirtyFields.username}
                    onClick={submitField('username')}
                  >
                    Save
                  </Button>  
                </Box>
                
              );
            }}
          />
        </PersonalDetailsSection> */}
      <PersonalDetailsSection
        title="Email address"
        description={{
          close: user.email,
        }}
      />
      {/* </Form> */}
    </Box>
  );
});
