import { Center } from '@chakra-ui/react';
import { Navigate } from '@tanstack/react-router';
import React from 'react';
import { SiFusionauth } from 'react-icons/si';

import { EmptyState } from 'shared/components/ui/empty-state';
import { selectUser } from 'shared/selectors/user/selectUser';
import { useAppSelector } from 'shared/store/hooks';

type Props = {
  Layout?: React.ComponentType<{ children: React.ReactNode }>;
}

export const ForbiddenUserStatus = ({ Layout = React.Fragment }: Props) => {
  const user = useAppSelector(selectUser);

  const title = React.useMemo(() => {
    switch (user?.status) {
    case 'deleting':
    case 'migratingRegion':
      return 'Attention';
    case 'banned':
      return 'You are account is banned.';
    default:
      return 'Forbidden';
    }
  }, [user?.status]);

  const description = React.useMemo(() => {
    switch (user?.status) {
    case 'deleting':
      return 'We are deleting your account. Please wait for the deletion to complete.';
    case 'migratingRegion':
      return 'We are migrating your data to a new region. Please wait for the migration to complete.';
    default:
      return 'You are not authorized to access this page.';
    }
  }, [user?.status]);

  if (user?.status === 'active') {
    return <Navigate to="/app" />;
  }

  return (
    <Layout>
      <Center
        w="full"
        h="full"
      >
        <EmptyState
          icon={<SiFusionauth />}
          title={title}
          description={description}
        />
      </Center>
    </Layout>
  );
};

export default ForbiddenUserStatus;