import React from 'react';

import { Box, Center, IconButton, IconButtonProps, Text, useColorModeValue } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useLongPress } from '@uidotdev/usehooks';
import { GoHome, GoPlus, GoSearch } from 'react-icons/go';
import { RxHamburgerMenu, RxReader } from 'react-icons/rx';

import { modalIds } from 'shared/constants/modalIds';
import { PrimaryNoteModal } from 'shared/containers/modals/PrimaryNoteModal';
import { useBrowserLocation } from 'shared/hooks/useBrowserLocation';
import { useBrowserNavigate } from 'shared/hooks/useBrowserNavigate';
import { useIsPrimareNote } from 'shared/hooks/useIsPrimaryNote';
import { showModal } from 'shared/modules/modal/modalSlice';
import { selectActiveSpace } from 'shared/selectors/space/selectActiveSpace';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';

import { createPrimaryNoteTab } from 'mobile/actions/createPrimaryNoteTab';
import { FooterNoteDialogs } from 'mobile/containers/FooterNavigation/FooterNoteDialogs';
import { HomeMenu } from 'mobile/containers/FooterNavigation/HomeMenu';
import { useDotMenuNoteId } from 'mobile/hooks/useDotMenuNoteId';

export const FooterNavigation = React.memo(() => {
  const dispatch = useAppDispatch();
  const activeSpace = useAppSelector(selectActiveSpace);
  const navigate = useBrowserNavigate();
  const { pathname } = useBrowserLocation();
  const borderColor = useColorModeValue('gray.600', 'gray.300');
  const noteId = useDotMenuNoteId();
  const isPrimaryNote = useIsPrimareNote();

  const tabsButtonProps = useLongPress(
    () => navigate({ to: '/app' }),
    { threshold: 500 }
  );

  const isDotMenuActive = pathname === '/app' || isPrimaryNote;

  const buttons = React.useMemo(() => {
    return [
      {
        label: 'home',
        onClick: () => {
          if (!activeSpace) {
            return;
          }

          if (!activeSpace.mainNoteId) {
            dispatch(showModal({ id: modalIds.primaryNote }));
            return;
          }

          if (isPrimaryNote) {
            dispatch(createPrimaryNoteTab());
          } else {
            navigate({ to: '/app/primary' });
          }
        },
        icon: <GoHome size="25" />,
        getMenu: activeSpace ? (
          { key, isActive, ...triggerProps }: { key: string, isActive: boolean } & IconButtonProps
        ) => {
          return (
            <IconWrapper key={key} isActive={isActive}>
              <HomeMenu {...triggerProps} />
            </IconWrapper>
          );
        } : undefined,
        isActive: pathname === '/app/primary',
      },
      {
        label: 'search',
        onClick: () => {
          navigate({ to: '/app/search' });
        },
        icon: <GoSearch size="25" />,
        isActive: pathname === '/app/search',
      },
      {
        label: 'app',
        onClick: () => {
          navigate({ to: '/app' });
        },
        icon: <RxReader size="25" />,
        isActive: pathname === '/app',
      },
      {
        label: 'tabs',
        onClick: () => {
          navigate({ to: '/app/tabs' });
        },
        icon: <Center
          w="6"
          h="6"
          rounded="6"
          border="2px"
          borderColor={borderColor}
        >
          {activeSpace?.tabs.length ? <Text fontSize="sm">{activeSpace.tabs.length}</Text> : <GoPlus />}
        </Center>,
        ...tabsButtonProps,
        onContextMenu: (event) => {
          event.preventDefault();
        },
        isActive: pathname === '/app/tabs',
      },
      {
        label: 'menu',
        onClick: () => {
          navigate({ to: '/app/menu' });
        },
        icon: <RxHamburgerMenu size="25" />,
        isActive: pathname === '/app/menu',
      },
    ];
  }, [
    dispatch,
    tabsButtonProps,
    borderColor,
    navigate,
    activeSpace,
    isPrimaryNote,
    pathname,
  ]);

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        flexWrap="nowrap"
        justifyContent="space-between"
        h="44px"
        px="4"
      >
        {buttons.map(({ label, icon, onClick, getMenu, isActive, ...rest }) => {
          const props = {
            size: 'md',
            'aria-label': label,
            icon: icon,
            onClick: onClick,
            variant: 'unstyled',
            display: 'inline-flex',
            colorScheme: 'brand',
            ...rest,
          };

          return getMenu 
            ? getMenu({ ...props, key: label, isActive }) 
            : <IconWrapper key={label} isActive={isActive}><IconButton {...props} /></IconWrapper>;
        })}
      </Box>
      <PrimaryNoteModal />
      {noteId && isDotMenuActive && (
        <FooterNoteDialogs noteId={noteId} />
      )}
    </>
  );
});

const IconWrapper = styled.div<{ isActive?: boolean }>`
  position: relative;
  
  &::before {
    content: ${({ isActive }) => (isActive ? '""' : 'none')};
    position: absolute;
    bottom: 1px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: black;
  }
`;