import React from 'react';
import { TabHeader, TabLayout } from 'mobile/modules/space/components/TabLayout';
import { Box } from '@chakra-ui/react';

export const NoteTab = () => {
  const renderedHeader = React.useMemo(() => {
    return <TabHeader>NoteTab title</TabHeader>;
  }, []);

  const renderedFooter = React.useMemo(() => {
    return <Box display="flex">footer</Box>;
  }, []);

  return (
    <TabLayout header={renderedHeader} footer={renderedFooter}>
      NoteTab
    </TabLayout>
  );
};
