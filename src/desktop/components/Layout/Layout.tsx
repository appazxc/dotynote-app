import styled from '@emotion/styled';
import * as React from 'react';

import { LayoutHeader } from './components/LayoutHeader';

type Props = {
  children: React.ReactNode,
  header?: React.ReactNode,
  footer?: React.ReactNode,
}

const Layout = ({ children, header, footer }: Props) => {
  return (
    <Container>
      {header ?? <LayoutHeader />}
      {children}
      {footer}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export { Layout };
