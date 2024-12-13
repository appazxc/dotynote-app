import { Box, Text } from '@chakra-ui/react';
import React from 'react';

import { EditableTitle } from './EditableTitle';

type Props = {
  title?: string,
  isWriteMode: boolean,
  onChange: (title: string) => void,
}

export const NoteTitle = ({ title, isWriteMode, onChange }: Props) => {
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
        title={title}
        onChange={onChange}
      />
    );
  }, [title, isWriteMode, onChange]);

  return (
    <Box>
      {content}
    </Box>
  );
};
