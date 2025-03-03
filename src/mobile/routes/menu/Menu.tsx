import { Box, VStack, Text } from '@chakra-ui/react';
import React from 'react';
import { FiUser } from 'react-icons/fi';
import { TbChartDots3, TbLogout2, TbSettings2 } from 'react-icons/tb';

import { logout } from 'shared/actions/logout';
import { Button } from 'shared/components/ui/button';
import { SWContext } from 'shared/core/Providers/SWProvider';
import { useAppDispatch } from 'shared/store/hooks';
import { useReactContext } from 'shared/util/useReactContext';

import { Layout } from 'mobile/components/Layout';
import { MobileLink } from 'mobile/components/MobileLink';

const Menu = React.memo(() => {
  const dispatch = useAppDispatch();
  const { isUpdateAvailable, updateSW } = useReactContext(SWContext);

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
        {list.map(({ label, icon, ...btnProps }) => {
          return (
            <React.Fragment key={label}>
              <Box>
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
      {isUpdateAvailable && (
        <Box px="4" py="2">
          <Text color="colorPalette.info" fontSize="sm">New version available</Text>
          <Button
            w="full"
            variant="subtle"
            colorPalette="purple"
            onClick={() => updateSW?.(true)}
          >
            Update
          </Button>
        </Box>
      )}
    </Layout>
  );
});

export default Menu;