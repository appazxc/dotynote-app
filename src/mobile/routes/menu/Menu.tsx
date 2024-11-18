import { Box, Separator, VStack } from '@chakra-ui/react';
import React from 'react';
import { FiUser } from 'react-icons/fi';
import { TbChartDots3, TbLogout2, TbSettings2 } from 'react-icons/tb';

import { logout } from 'shared/actions/logout';
import { Button } from 'shared/components/ui/button';
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
      label: 'Spaces',
      to: '/app/spaces' as const,
      icon: <TbChartDots3 />,
      divider: true,
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
      divider: true,
    },
  ];

  return (
    <Layout>
      <VStack alignItems="stretch" gap="0">
        {list.map(({ label, icon, divider, ...btnProps }, index) => {
          return (
            <React.Fragment key={label}>
              {!!index && <Separator />}
              <Box px="2">
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
              </Box>
            </React.Fragment>
          );
        })}
      </VStack>
    </Layout>
  );
});

export default Menu;