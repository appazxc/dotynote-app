import { Button, VStack } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';

const list = [
  {
    name: 'Profile',
    to: '/profile',
  },
  {
    name: 'Settings',
    to: '/settings',
  },
];

export const Sidebar = () => {
  return (
    <VStack alignItems="stretch" gap="1">
      {list.map(({ name, to }) => (
        <Link
          key={name}
          to={to}
          replace
        >
          {({ isActive }) => {
            return (
              <Button
                size="sm"
                w="full"
                justifyContent="start"
                variant={isActive ? 'solid' : 'ghost'}
              >
                {name}
              </Button>
            );
          }}
        </Link>
      ))}
    </VStack> 
  );
};
