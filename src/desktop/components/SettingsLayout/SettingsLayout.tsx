import { Box, Button, Grid, GridItem } from '@chakra-ui/react';
import { MatchRoute } from '@tanstack/react-router';
import React from 'react';
import { FiUser } from 'react-icons/fi';
import { RiBillLine } from 'react-icons/ri';
import { TbSettings2 } from 'react-icons/tb';

import { DefaultLayoutHeader } from 'desktop/components/DefaultLayoutHeader';
import { DesktopLink } from 'desktop/components/DesktopLink';
import { Layout } from 'desktop/components/Layout';

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
    {
      label: 'Billing',
      to: '/app/billing' as const,
      icon: <RiBillLine />,
    },
  ];

  const renderedHeader = React.useMemo(() => {
    return (
      <DefaultLayoutHeader showBackButton />
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
                      <DesktopLink replace to={to}>{icon} {label}</DesktopLink>
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
