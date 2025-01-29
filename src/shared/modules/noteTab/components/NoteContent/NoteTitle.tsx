import { Box, Text } from '@chakra-ui/react';
import React from 'react';

import { EditableTitle } from './EditableTitle';

type Props = {
  title?: string,
  isWriteMode: boolean,
  isMobile: boolean,
  onChange: (title: string) => void,
}

export const NoteTitle = ({ title, isWriteMode, isMobile, onChange }: Props) => {
  const content = React.useMemo(() => {
    if (!isWriteMode) {
      return title ? (
        <Text
          fontSize={isMobile ? 'xl' : '4xl'}
          fontWeight="500"
          lineHeight="1.2"
          whiteSpaceCollapse="preserve"
        >
          {title}
        </Text>
      ) : null;
    }

    return (
      <EditableTitle
        title={title}
        isMobile={isMobile}
        onChange={onChange}
      />
    );
  }, [title, isWriteMode, onChange, isMobile]);

  return (
    <Box>
      {content}
    </Box>
  );
};
