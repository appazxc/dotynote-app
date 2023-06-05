import styled from '@emotion/styled';
import * as React from 'react';

type Props = {
  children: React.ReactNode,
  header?: React.ReactNode,
  footer?: React.ReactNode,
}

const Layout = ({ children, header, footer }: Props) => {
  return (
    <Container>
      {header}
      {children}
      {footer}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export default Layout;
