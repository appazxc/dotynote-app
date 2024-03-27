import React from 'react';

interface MenuTriggerProps<T extends React.ElementType> {
  as?: T;
  children?: React.ReactNode;
}

const MenuTriggerInner = <T extends React.ElementType = 'div'>({
  as,
  ...props
}:
  MenuTriggerProps<T>
  & Omit<React.ComponentPropsWithoutRef<T>, keyof MenuTriggerProps<T>>, ref) => {
  const Component = as || 'div';
  return <Component ref={ref} {...props} />;
};

export const MenuTrigger = React.forwardRef(MenuTriggerInner);