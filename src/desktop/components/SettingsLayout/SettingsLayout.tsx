import { Box, Button, Grid, GridItem } from '@chakra-ui/react';
import { MatchRoute } from '@tanstack/react-router';
import React from 'react';
import { FiUser } from 'react-icons/fi';
import { TbSettings2 } from 'react-icons/tb';

import { Logo } from 'shared/components/Logo';

import { DesktopLink } from 'desktop/components/DesktopLink';
import { Layout } from 'desktop/components/Layout';
import { LayoutHeader } from 'desktop/components/LayoutHeader';

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
          pt="10"
          alignItems="stretch"
          gap="1"
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
                      size="sm"
                      display="inline-flex"
                      variant={match ? 'subtle' : 'ghost'}
                      colorPalette="gray"
                      justifyContent="start"
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
