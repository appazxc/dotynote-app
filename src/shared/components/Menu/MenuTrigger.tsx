import React from 'react';

declare module 'react' {
  function forwardRef<T, P = object>(
    render: (props: P, ref: React.Ref<T>) => React.ReactNode | null
  ): (props: P & React.RefAttributes<T>) => React.ReactNode | null;
}

type CustomComponentProps<
  C extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
  O extends object
> = React.ComponentPropsWithRef<
  C extends keyof JSX.IntrinsicElements | React.ComponentType<any> ? C : never
> &
  O & { as?: C };

interface CustomComponent<
  C extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
  O extends object
> {
  <AsC extends keyof JSX.IntrinsicElements | React.ComponentType<any> = C>(
    props: CustomComponentProps<AsC, O>
  ): React.ReactElement<CustomComponentProps<AsC, O>>;
}

// @ts-ignore
const Component: CustomComponent<'div', object> = (props, ref) => (
  <div ref={ref} {...props} />
);

export const MenuTrigger = React.forwardRef(Component);
