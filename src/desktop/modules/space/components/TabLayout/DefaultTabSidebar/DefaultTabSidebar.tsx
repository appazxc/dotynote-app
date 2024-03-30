import React from 'react';

import { Box, IconButton } from '@chakra-ui/react';
import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router';

import { useTabContext } from 'shared/modules/space/components/TabProvider';

import { TabSidebar } from 'desktop/modules/space/components/TabLayout';

type Props = {
  inline?: boolean,
}

export const DefaultTabSidebar = React.memo(({ inline }: Props) => {
  const navigate = useNavigate();
  const tab = useTabContext();

  const items = React.useMemo(() => {
    return [
      {
        label: 'Back',
        icon: <BsArrowLeft />,
        onClick: () => navigate(-1),
        isDisabled: tab.routes.length <= 1,
      },
    ];
  }, [navigate, tab.routes.length]);

  return (
    <TabSidebar inline={inline}>
      <Box
        gap="2"
        display="flex"
        flexDirection={inline ? 'row' : 'column'}
        p="2"
      >
        {items.map(({ label, ...rest }) => 
          (
            <IconButton
              key={label}
              size="sm"
              variant="ghost"
              aria-label={label}
              {...rest}
            />
          ))}
      </Box>
    </TabSidebar>
  );
});
