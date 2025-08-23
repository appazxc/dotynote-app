import { Box, Button, Grid, GridItem, IconButton, Text, VStack } from '@chakra-ui/react';
import { MatchRoute } from '@tanstack/react-router';
import React from 'react';
import { FiUser } from 'react-icons/fi';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';
import { RiBillLine } from 'react-icons/ri';
import { TbSettings2 } from 'react-icons/tb';

import { ArrowLeftIcon } from 'shared/components/ui/icons';

import { DefaultLayoutHeader } from 'desktop/components/DefaultLayoutHeader';
import { DesktopLink } from 'desktop/components/DesktopLink';
import { Layout } from 'desktop/components/Layout';

type Props = React.PropsWithChildren<{
  title?: string;
  description?: string;
}>;

export const SettingsLayout = React.memo(({ children, title, description }: Props) => {
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
      label: 'Plan & Billing',
      to: '/app/billing' as const,
      icon: <RiBillLine />,
    },
    {
      label: 'Balance',
      to: '/app/balance' as const,
      icon: <MdOutlineAccountBalanceWallet />,
    },
  ];

  const renderedHeader = React.useMemo(() => {
    return (
      <DefaultLayoutHeader
        left={(
          <IconButton 
            asChild
            size="xs"
            variant="ghost"
            iconSize="auto"
          >
            <DesktopLink to="/app">
              <ArrowLeftIcon size="20px" />
            </DesktopLink>
          </IconButton>
        )}
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
            <VStack
              align="flex-start"
              gap={1}
              mb="6"
            >
              {title && (
                <Text 
                  fontSize={{ base: '2xl', md: '3xl' }} 
                  fontWeight="bold" 
                  color="fg"
                >
                  {title}
                </Text>
              )}
              {description && (
                <Text fontSize="md" color="fg.muted">
                  {description}
                </Text>
              )}
            </VStack>
            {children}
          </Box>
        </GridItem>
      </Grid>
    </Layout>
  );
});
