import React from 'react';

interface MenuTriggerProps<T extends React.ElementType> {
  as?: T;
  children?: React.ReactNode;
}

const MenuTrigger = <T extends React.ElementType = 'div'>({
  as,
  ...props
}:
  MenuTriggerProps<T>
  & Omit<React.ComponentPropsWithoutRef<T>, keyof MenuTriggerProps<T>>
) => {
  const Component = as || 'div';
  return <Component {...props} />;
};

export { MenuTrigger };