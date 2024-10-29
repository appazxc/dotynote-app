import React from 'react';

import { Box, Button, Container, Divider, IconButton, useColorMode, VStack } from '@chakra-ui/react';
import { BsFillMoonStarsFill } from 'react-icons/bs';
import { FiUser } from 'react-icons/fi';
import { IoSunny } from 'react-icons/io5';
import { TbChartDots3, TbLogout2, TbSettings2 } from 'react-icons/tb';

import { logout } from 'shared/actions/logout';
import { useAppDispatch } from 'shared/store/hooks';

import { Layout, LayoutHeader } from 'mobile/components/Layout';
import { MobileLink } from 'mobile/components/MobileLink';

const Menu = React.memo(() => {
  const dispatch = useAppDispatch();
  const { colorMode, toggleColorMode } = useColorMode();

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

  const renderedThemeButton = React.useMemo(() => {
    return (
      <IconButton 
        size="sm"
        icon={colorMode === 'light' ? <BsFillMoonStarsFill /> : <IoSunny />}
        aria-label=""
        colorScheme="gray"
        variant="ghost"
        onClick={toggleColorMode}
      />
    );
  }, [colorMode, toggleColorMode]);

  return (
    <Layout header={<LayoutHeader right={renderedThemeButton} /> }>
      <VStack alignItems="stretch" gap="0">
        {list.map(({ label, icon, divider, ...btnProps }, index) => {
          return (
            <React.Fragment key={label}>
              {!!index && <Divider />}
              <Box px="2">
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
              </Box>
            </React.Fragment>
          );
        })}
      </VStack>
    </Layout>
  );
});

export default Menu;