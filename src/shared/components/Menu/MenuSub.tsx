import { Box, ButtonProps } from '@chakra-ui/react';
import {
  flip,
  offset,
  Placement,
  safePolygon,
  shift,
  useFloating,
  useHover,
  useInteractions,
} from '@floating-ui/react';
import React from 'react';
import { FaChevronRight } from 'react-icons/fa';

import { MenuBack } from 'shared/components/Menu/MenuBack';
import { MenuItemBase } from 'shared/components/Menu/MenuItemBase';
import { MenuList, MenuListContext } from 'shared/components/Menu/MenuList';
import { useIsMobile } from 'shared/hooks/useIsMobile';

import { MenuContext } from './MenuContext';

export type MenuSubProps = React.PropsWithChildren<{
  label: React.ReactNode,
  onClick?: () => void,
  placement?: Placement,
} & ButtonProps>

export const MenuSub = ({ onClick, label, children, placement, ...buttonProps }: MenuSubProps) => {
  const menu = React.useContext(MenuContext);
  const [isOpen, setIsOpen] = React.useState(false);
  const isMobile = useIsMobile();
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset({ mainAxis: -5, alignmentAxis: 0 }),
      flip({
        fallbackPlacements: ['left'],
      }),
      shift({ padding: 10 }),
    ],
    placement: placement || 'right',
  });
 
  const hover = useHover(context, {
    handleClose: safePolygon({ blockPointerEvents: true }),
  });
 
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
  ]);

  const id = React.useId();
  const { activeItemId, setActive, goBack } = React.useContext(MenuListContext);

  const handleGoBack = React.useCallback(() => {
    setIsOpen(false);
    goBack();
  }, [goBack]);

  const itemProps = isMobile ? {
    onClick: () => {
      setActive(id);
      setIsOpen(true);
    
      if (onClick) {
        onClick?.();
      } 
    },
    ...buttonProps,
  } : {
    ref: refs.setReference,
    onClick: () => {
      if (onClick) {
        onClick?.();
        menu.close();
      }
    },
    ...getReferenceProps(),
    ...buttonProps,

  };

  if (activeItemId && activeItemId !== id) {
    return null;
  }

  const hideItem = activeItemId === id;

  const content = isMobile ? (
    <MenuList>
      <MenuBack onClick={handleGoBack} />
      {children}
    </MenuList>
  ) : (
    <Box
      ref={refs.setFloating}
      style={floatingStyles}
      {...getFloatingProps()}
      outline="transparent"
      zIndex="1"
    >
      <MenuList>
        {children}
      </MenuList>
    </Box>
  );

  return (
    <>
      {!hideItem && (
        <MenuItemBase
          iconSize="auto"
          _icon={{ '&:last-child': {
            marginLeft: 'auto',
          } }}
          {...itemProps}
          gap="2"
          justifyContent="space-between"
        >
          <Box
            alignItems="center"
            display="flex"
            gap="2"
          >{label}</Box><FaChevronRight size="10" />
        </MenuItemBase>
      )}
      {isOpen && content}
    </>
  );
};
