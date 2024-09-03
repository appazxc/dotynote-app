import React from 'react';

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
import { FaChevronRight } from 'react-icons/fa';

import { MenuItemBase } from 'shared/components/Menu/MenuItemBase';

import { MenuContext } from './MenuContext';

type Props = React.PropsWithChildren<{
  label: string,
  onClick?: () => void,
  placement?: Placement,
} & ButtonProps>

export const MenuSub = ({ onClick, label, children, placement, ...buttonProps }: Props) => {
  const menu = React.useContext(MenuContext);
  const [isOpen, setIsOpen] = React.useState(false);

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

  return (
    <>
      <MenuItemBase
        ref={refs.setReference}
        rightIcon={<FaChevronRight size="10" />}
        onClick={() => {
          if (onClick) {
            onClick?.();
            menu.close();
          }
        }}
        {...getReferenceProps()}
        {...buttonProps}
      >
        {label}
      </MenuItemBase>
      {isOpen && (
        <Box
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          outline="transparent"
        >
          {children}
        </Box>
      )}
    </>
  );
};
