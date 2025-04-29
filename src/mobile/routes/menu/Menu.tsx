import { Box, Separator, Stack, VStack } from '@chakra-ui/react';
import React from 'react';
import { FiUser } from 'react-icons/fi';
import { RiBillLine } from 'react-icons/ri';
import { TbChartDots3, TbLogout2, TbSettings2 } from 'react-icons/tb';

import { logout } from 'shared/actions/logout';
import { RemainingCredits } from 'shared/components/RemainingCredits';
import { Button } from 'shared/components/ui/button';
import { UpdateAvailability } from 'shared/components/UpdateAvailability';
import { useAppDispatch } from 'shared/store/hooks';

import { Layout } from 'mobile/components/Layout';
import { MobileLink } from 'mobile/components/MobileLink';

const Menu = React.memo(() => {
  const dispatch = useAppDispatch();

  const list = [
    {
      label: 'Profile',
      to: '/app/profile' as const,
      icon: <FiUser />,
    },
    {
      label: 'Settings',
      to: '/app/settings' as const,
      icon: <TbSettings2 />,
    },
    {
      label: 'Plan & Billing',
      to: '/app/billing' as const,
      icon: <RiBillLine />,
    },
    {
      label: 'Spaces',
      to: '/app/spaces' as const,
      icon: <TbChartDots3 />,
      hasDivider: true,
    },
    // {
    //   label: 'Unsticked notes',
    //   to: '/app/spaces' as const,
    //   icon: <TbChartDots3 />,
    // },
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
    <Layout
      scrollProps={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
      }}
    >
      <VStack alignItems="stretch" gap="0">
        {list.map(({ label, icon, hasDivider, ...btnProps }) => {
          return (
            <React.Fragment key={label}>
              {hasDivider && <Separator borderColor="gray.200" my="1" />}
              <Button
                as={MobileLink}
                w="full"
                variant="plain"
                display="flex"
                justifyContent="flex-start"
                {...btnProps}
              >
                {icon} {label}
              </Button>
            </React.Fragment>
          );
        })}
      </VStack>
      <Stack mx="4" gap="2">
        <RemainingCredits size="md" />
        <UpdateAvailability />
      </Stack>
    </Layout>
  );
});

export default Menu;