import React from 'react';

export const MenuContext = React.createContext<{
  getItemProps: (
    userProps?: React.HTMLProps<HTMLElement>
  ) => Record<string, unknown>,
  close: () => void,
  isOpen: boolean,
    }>({
      getItemProps: () => ({}),
      isOpen: false,
      close: () => {},
    });
