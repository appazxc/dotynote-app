import { IconButton, useToken } from '@chakra-ui/react';
import React from 'react';
import { GoDotFill } from 'react-icons/go';

import { openTab } from 'shared/actions/space/openTab';
import { useColorModeValue } from 'shared/components/ui/color-mode';
import { modalIds } from 'shared/constants/modalIds';
import { noteRoutePath } from 'shared/constants/noteRoutePath';
import { showModal } from 'shared/modules/modal/modalSlice';
import { useBuildTabHref } from 'shared/modules/space/hooks/useBuildTabHref';
import { selectActiveSpace } from 'shared/selectors/space/selectActiveSpace';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

export const DotHeaderButton = () => {
  const dispatch = useAppDispatch();
  const space = useAppSelector(selectActiveSpace);
  const brandToken = useColorModeValue(
    'gray.900',
    'white'
  );
  const [brand] = useToken('colors', brandToken);
  const buildTabHref = useBuildTabHref();
  
  invariant(space, 'Missing space');

  const handlePrimaryNoteButtonClick = React.useCallback(() => {
    if (!space) {
      return;
    }

    if (space.mainNoteId) {
      dispatch(
        openTab({
          path: buildTabHref(noteRoutePath, { noteId: space.mainNoteId }),
          active: true,
        })
      );
    } else {
      dispatch(showModal({ id: modalIds.primaryNote }));
    }
    
  }, [dispatch, space, buildTabHref]);
  
  return (
    <IconButton
      position="relative"
      size="xs"
      iconSize="auto"
      aria-label="Side note menu"
      colorScheme={space.mainNoteId ? undefined : 'gray'}
      variant="outline"
      onClick={handlePrimaryNoteButtonClick}
    >
      <GoDotFill size="30" color={space.mainNoteId ? brand : 'gray'} />
    </IconButton>
  );
};
