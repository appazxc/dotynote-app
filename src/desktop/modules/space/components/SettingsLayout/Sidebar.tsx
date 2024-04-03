import React from 'react';

import { VStack, Button } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

import { tabRouteNames } from 'shared/modules/space/constants/tabRouteNames';
import { buildTabUrl } from 'shared/modules/space/util/buildTabUrl';

const list = [
  {
    name: 'Profile',
    routeName: tabRouteNames.profile,
  },
  {
    name: 'Settings',
    routeName: tabRouteNames.settings,
  },
].map(({ routeName, ...rest }) => ({
  url: buildTabUrl({ routeName }),
  routeName,
  ...rest,
}));

export const Sidebar = () => {
  return (
    <VStack alignItems="stretch" gap="1">
      {list.map(({ name, url }) => (
        <NavLink
          key={name}
          to={url}
          replace
        >
          {({ isActive, isPending, isTransitioning }) => (
            <Button
              size="sm"
              w="full"
              justifyContent="start"
              variant={isActive ? 'solid' : 'ghost'}
            >
              {name}
            </Button>
          )}
        </NavLink>
      ))}
    </VStack> 
  );
};
