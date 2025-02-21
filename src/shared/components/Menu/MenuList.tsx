import { Box, BoxProps } from '@chakra-ui/react';
import React from 'react';

type Context = {
  activeItemId: string | null;
  setActive: (itemId: string) => void;
  goBack: () => void;
}

export const MenuListContext = React.createContext<Context>({
  activeItemId: null, 
  setActive: () => {}, 
  goBack: () => {}, 
});

export const MenuList = React.memo(React.forwardRef<HTMLDivElement, BoxProps>(({ children, ...props }, ref) => {
  const [activeList, setActiveList] = React.useState<string[]>([]);
  const [activeItemId, setActive] = React.useState<Context['activeItemId']>(null);

  const listProps = activeItemId ? {} : {
    ref,
    boxShadow:'md',
    borderRadius:'md',
    bg:'white',
    display:'flex',
    flexDirection:'column',
    p:'1',
    ...props,
    onContextMenu: (e) => {
      e.preventDefault();
    },
  };

  return (
    <MenuListContext.Provider
      value={{
        activeItemId,
        setActive: (itemId: string) => {
          setActive(itemId);
          setActiveList(x => [...x, itemId]);
        },
        goBack: () => {
          const nextActiveItemId = activeList[activeList.length - 2] || null;
          setActiveList(x => x.slice(0, -1));
          setActive(nextActiveItemId);
        },
      }}
    >
      <Box {...listProps} className="light">
        {children}
      </Box>
    </MenuListContext.Provider>
  );
}));
