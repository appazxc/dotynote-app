import React from 'react';

import { Button, Container, Divider, VStack } from '@chakra-ui/react';
import { CgProfile } from 'react-icons/cg';
import { TbChartDots3, TbLogout2, TbSettings2 } from 'react-icons/tb';

import { logout } from 'shared/actions/auth';
import { useAppDispatch } from 'shared/store/hooks';

import { Layout } from 'mobile/components/Layout';
import { MobileLink } from 'mobile/components/MobileLink';

export const Menu = React.memo(() => {
  const dispatch = useAppDispatch();
  
  const list = [
    {
      label: 'Profile',
      to: '/app/profile' as const,
      icon: <CgProfile />,
    },
    {
      label: 'Spaces',
      to: '/app/spaces' as const,
      icon: <TbChartDots3 />,
    },
    {
      label: 'Settings',
      to: '/app/settings' as const,
      icon: <TbSettings2 />,
    },
    {
      label: 'Logout',
      to: '/' as const,
      icon: <TbLogout2 />,
      onClick: () => {
        dispatch(logout());
      },
      hasDivider: true,
    },
  ];
  return (
    <Layout>
      <Container pt="8" maxW="md">
        <VStack gap="1" align="stretch">
          {list.map(({ label, icon, hasDivider, ...btnProps }) => {
            return (
              <React.Fragment key={label}>
                {hasDivider && <Divider />}
                <Button
                  as={MobileLink}
                  w="full"
                  variant="unstyled"
                  leftIcon={icon}
                  display="flex"
                  justifyContent="flex-start"
                  {...btnProps}
                >
                  {label}
                </Button>
              </React.Fragment>
            );
          })}
        </VStack>
      </Container>
    </Layout>
  );
});
