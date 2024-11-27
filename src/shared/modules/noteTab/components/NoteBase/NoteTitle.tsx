import { Box, Text } from '@chakra-ui/react';
import React from 'react';

import { EditableTitle } from './EditableTitle';

type Props = {
  title?: string,
  isWriteMode: boolean,
  isMobile?: boolean,
  onChange: (title: string) => void,
}

export const NoteTitle = ({ title, isWriteMode, isMobile, onChange }: Props) => {
  const content = React.useMemo(() => {
    if (!isWriteMode) {
      return title ? (
        <Text
          fontSize="4xl"
          fontWeight="600"
          lineHeight="1.2"
          whiteSpaceCollapse="preserve"
        >
          {title}
        </Text>
      ) : null;
    }

    return (
      <EditableTitle
        isMobile={isMobile}
        title={title}
        onChange={onChange}
      />
    );
  }, [title, isWriteMode, isMobile, onChange]);

  return (
    <Box>
      {content}
    </Box>
  );
};
