import { Box } from '@chakra-ui/react';
import React from 'react';
import { MdOutlineDone } from 'react-icons/md';

import { MenuItem } from 'shared/components/Menu';
import { spaceSelector } from 'shared/selectors/entities';
import { selectActiveSpaceId } from 'shared/selectors/space/selectActiveSpaceId';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { updateActiveSpaceId } from 'shared/store/slices/appSlice';
import { invariant } from 'shared/util/invariant';

type Props = {
  spaceId: string,
};

export const SpaceMenuItem = React.memo(({ spaceId }: Props) => {
  const space = useAppSelector(state => spaceSelector.getEntityById(state, spaceId));
  const dispatch = useAppDispatch();
  const activeSpaceId = useAppSelector(selectActiveSpaceId);
  const isActive = activeSpaceId === spaceId;

  invariant(space, 'Missing space');

  return (
    <MenuItem
      label={(
        <Box
          display="flex"
          justifyContent="space-between"
          w="full"
        >
          {space.name}{isActive ? <MdOutlineDone /> : undefined}
        </Box>
      )}
      onClick={() => {
        if (!isActive) {
          dispatch(updateActiveSpaceId(spaceId));
        }
      }}
    />
  );
});
