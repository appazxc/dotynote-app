import { Center, Text } from '@chakra-ui/react';
import { Navigate } from '@tanstack/react-router';
import { AxiosError } from 'axios';
import React from 'react';

import { useLoginEmail } from 'shared/api/hooks/useLoginEmail';
import { Loader } from 'shared/components/Loader';

type Props = {
  email: string;
  token: string;
}

function LoginEmailContent({ email, token }: Props) {
  const { mutate, error, isSuccess } = useLoginEmail();

  React.useEffect(() => {
    mutate({ email, token });
  }, [mutate, email, token]);

  const content = React.useMemo(() => {
    if (error && error instanceof AxiosError) {
      return (
        <Center h="full">
          <Text>{error.response?.data.message || 'An error accured.'}</Text>
        </Center>
      );
    }

    if (isSuccess) {
      return <Navigate to="/app" />;
    }

    return <Loader />;
  }, [isSuccess, error]);

  return content;
}

export { LoginEmailContent };
