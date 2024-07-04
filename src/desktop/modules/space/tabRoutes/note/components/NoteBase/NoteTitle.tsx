import React from 'react';

import { Box, Heading } from '@chakra-ui/react';

import { EditableTitle } from './EditableTitle';

type Props = {
  title?: string,
  isWriteMode: boolean,
  onChange: (title: string) => void,
}

export const NoteTitle = ({ title, isWriteMode, onChange }: Props) => {
  const content = React.useMemo(() => {
    if (!isWriteMode) {
      return title ? <Heading>{title}</Heading> : null;
    }

    return <EditableTitle title={title} onChange={onChange} />;
  }, [title, isWriteMode, onChange]);

  return (
    <Box>
      {content}
    </Box>
  );
};
