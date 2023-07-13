import { Box, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import * as React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  children: React.ReactNode,
  header?: React.ReactNode,
  footer?: React.ReactNode,
}

const Layout = ({ children, header, footer }: Props) => {
  const renderedHeader = React.useMemo(() => {
    return (
      <Box
        position="sticky"
        py="3"
        pl="4"
      >
        <Link to="/"><Text fontWeight="bold" display="inline">[.dotynote]</Text></Link>
        <Text
          fontSize="xs"
          display="inline"
          as="sub"
          ml="0.5"
        >
          preAlpha
        </Text>
      </Box>
    );
  }, []);

  return (
    <Container>
      {header ?? renderedHeader}
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
