interface Keyable {
  [key: string]: any;
}

declare namespace App {
  type Theme = { colors: { brand: string } };
}

declare module '@emotion/styled' {
  import { CreateStyled } from '@emotion/styled/types/index';

  export * from '@emotion/styled/types/index';
  const customStyled: CreateStyled<App.Theme>;
  export default customStyled;
}