import { Box, IconButton } from '@chakra-ui/react';
import { useRouter } from '@tanstack/react-router';
import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';

import { useTabContext } from 'shared/modules/space/components/TabProvider';

import { TabSidebar } from 'desktop/modules/space/components/TabSidebar';

type Props = {
  inline?: boolean,
}

export const DefaultTabSidebar = React.memo(({ inline }: Props) => {
  const { history } = useRouter();
  const tab = useTabContext();

  const items = React.useMemo(() => {
    return [
      {
        label: 'Back',
        icon: <BsArrowLeft />,
        onClick: () => history.back(),
        disabled: tab.routes.length <= 1,
      },
    ];
  }, [history, tab.routes.length]);

  return (
    <TabSidebar inline={inline}>
      <Box
        gap="2"
        display="flex"
        flexDirection={inline ? 'row' : 'column'}
        p="2"
      >
        {items.map(({ label, icon, ...rest }) => 
          (
            <IconButton
              key={label}
              size="xs"
              variant="ghost"
              aria-label={label}
              {...rest}
            >{icon}</IconButton>
          ))}
      </Box>
    </TabSidebar>
  );
});
