import React from 'react';

import { Button, Container, Divider, IconButton, useColorMode, VStack } from '@chakra-ui/react';
import { BsFillMoonStarsFill } from 'react-icons/bs';
import { FiUser } from 'react-icons/fi';
import { IoSunny } from 'react-icons/io5';
import { TbChartDots3, TbLogout2, TbSettings2 } from 'react-icons/tb';

import { logout } from 'shared/actions/auth';
import { useAppDispatch } from 'shared/store/hooks';

import { Layout, LayoutHeader } from 'mobile/components/Layout';
import { MobileLink } from 'mobile/components/MobileLink';

export const Menu = React.memo(() => {
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
        onClick={toggleColorMode}
      />
    );
  }, [colorMode, toggleColorMode]);

  return (
    <Layout header={<LayoutHeader right={renderedThemeButton} /> }>
      <Container>
        <VStack alignItems="stretch" gap="0">
          {list.map(({ label, icon, divider, ...btnProps }) => {
            return (
              <React.Fragment key={label}>
                {divider && <Divider />}
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
