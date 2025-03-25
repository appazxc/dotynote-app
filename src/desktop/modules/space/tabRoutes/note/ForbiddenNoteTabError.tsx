import { Center } from '@chakra-ui/react';
import React from 'react';
import { TbFaceIdError } from 'react-icons/tb';

import { Button } from 'shared/components/ui/button';
import { EmptyState } from 'shared/components/ui/empty-state';
import { ParsedApiError } from 'shared/helpers/api/getApiError';

import { DesktopTabLink } from 'desktop/modules/space/components/DesktopTabLink';

type Props = {
  error: ParsedApiError
};

export const ForbiddenNoteTabError = React.memo(({ error }: Props) => {
  return (
    <Center
      w="full"
      h="full"
    >
      <EmptyState
        icon={<TbFaceIdError />}
        title={error.message}
        description="Access to this note is forbidden"
      >
        <Button asChild variant="outline">
          <DesktopTabLink to="/">Return to home</DesktopTabLink>
        </Button>
      </EmptyState>
    </Center>
  );
});
