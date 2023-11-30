import { Box, Center, IconButton } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router';
import { CiMenuBurger } from "react-icons/ci";
import { GoDotFill, GoSearch, GoPlus, GoHome } from "react-icons/go";
import {router} from 'mobile/routes/router';
import { routeNames } from 'shared/constants/routeNames';
import { getUrl } from 'shared/util/router/getUrl';

export const NoteFooter = () => {
  const { noteId = "" } = useParams();

  const buttons = React.useMemo(() => {
    return [
      {
        label: 'home',
        onClick: () => {},
        icon: <GoHome size="25" />,
      },
      {
        label: 'search',
        onClick: () => {
          router.navigate(getUrl(routeNames.search));
        },
        icon: <GoSearch size="25" />,
      },
      {
        label: 'menu',
        onClick: () => {},
        icon: <GoDotFill size="35" />,
      },
      {
        label: 'tabs',
        onClick: () => {
          router.navigate(getUrl(routeNames.tabs));
        },
        icon: <Center
          w="6"
          h="6"
          rounded="6"
          border="1px"
          borderColor="gray.700"
        >
          <GoPlus />
        </Center>,
      },
      {
        label: 'account',
        onClick: () => {
          router.navigate(getUrl(routeNames.account));
        },
        icon: <CiMenuBurger size="25" />,
      },
    ];
  }, []);

  return (
    <Box
      display="flex"
      alignItems="center"
      flexWrap="nowrap"
      justifyContent="space-between"
      px="2"
    >
      {buttons.map((button) => (
        <IconButton
          key={button.label}
          size="md"
          aria-label={button.label}
          icon={button.icon}
          onClick={button.onClick}
          variant="ghost"
          colorScheme="whatsapp"
        />
      ))}
    </Box>
  );
};
