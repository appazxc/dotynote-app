interface Keyable {
  [key: string]: any
}

declare module App {
  type Theme = { colors: { brand: string } };
}

declare module '@emotion/styled' {
  import { CreateStyled } from '@emotion/styled/types/index';

  export * from '@emotion/styled/types/index';
  const customStyled: CreateStyled<App.Theme>;
  export default customStyled;
}

declare module 'react' {
  import React from 'react';
  function forwardRef<T, P = object>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;

  export default { forwardRef } & typeof React;
}