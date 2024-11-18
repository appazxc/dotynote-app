import { Box, Button, Grid, GridItem } from '@chakra-ui/react';
import { MatchRoute } from '@tanstack/react-router';
import React from 'react';
import { FiUser } from 'react-icons/fi';
import { TbSettings2 } from 'react-icons/tb';

import { Logo } from 'shared/components/Logo';

import { DesktopLink } from 'desktop/components/DesktopLink';
import { Layout, LayoutHeader } from 'desktop/components/Layout';

type Props = React.PropsWithChildren<{}>;

export const SettingsLayout = React.memo(({ children }: Props) => {
  const links = [
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
  ];

  const renderedHeader = React.useMemo(() => {
    return (
      <LayoutHeader
        py="2"
        pr="4"
        pl="6"
        left={<DesktopLink to="/app"><Logo /></DesktopLink>}
      />
    );
  }, []);

  return (
    <Layout header={renderedHeader}>
      <Grid
        templateColumns={{ sm: '150px 1fr', lg: '150px 1fr 150px' }}
        gap={6}
        px="6"
      >
        <GridItem
          display="flex"
          flexDirection="column"
          gap="2"
          pt="10"
          alignItems="stretch"
        >
          {links.map(({ label, to, icon }) => {
            return (
              <MatchRoute
                key={label}
                to={to}
              >
                {(match) => {
                  return (
                    <Button
                      asChild
                      display="inline-flex"
                      opacity={match ? '1' : '0.6'}
                      variant="subtle"
                      justifyContent="start"
                      _hover={{
                        textDecoration: 'none',
                        opacity: '1',
                      }}
                    >
                      <DesktopLink to={to}>{icon} {label}</DesktopLink>
                    </Button>
                  );
                }}
              </MatchRoute>
            );
          })}
        </GridItem>
        <GridItem py="10">
          <Box maxW="2xl" margin="auto">
            {children}
          </Box>
        </GridItem>
      </Grid>
    </Layout>
  );
});
