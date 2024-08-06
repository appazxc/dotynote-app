import React from 'react';

import { IconButton } from '@chakra-ui/react';
import { useRouter } from '@tanstack/react-router';
import { BsArrowLeft } from 'react-icons/bs';

import { useTabTitle } from 'shared/hooks/useTabTitle';
import { useTabContext } from 'shared/modules/space/components/TabProvider';

import { TabHeader } from 'mobile/modules/space/components/TabHeader';
import { router } from 'mobile/modules/space/tabRoutes/router';

type Props = {
  noteId: number,
}

export const NoteHeader = ({ noteId }: Props) => {
  const { history } = useRouter();
  const tab = useTabContext();
  const title = useTabTitle(tab.routes[tab.routes.length - 1], router);

  const renderedBackButton = React.useMemo(() => {
    return (
      <IconButton
        size="sm"
        aria-label="Note back"
        icon={<BsArrowLeft />}
        onClick={() => history.back()}
        isDisabled={tab.routes.length <= 1}
        variant="ghost"
        colorScheme="brand"
      />
    );
  }, [tab.routes.length, history]);

  return (
    <TabHeader left={renderedBackButton}>
      {title}
    </TabHeader>
  );
};
