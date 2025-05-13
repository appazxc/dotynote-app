import { IconButton } from '@chakra-ui/react';
import omit from 'lodash/omit';
import React from 'react';

import { useUpdatePostsSettingsFilters } from 'shared/api/hooks/useUpdatePostsSettingsFilters';
import { FilterIcon } from 'shared/components/ui/icons';
import { modalIds } from 'shared/constants/modalIds';
import { NoteFiltersModal } from 'shared/containers/modals/NoteFiltersModal';
import { showModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';
import { NoteFiltersEntity } from 'shared/types/entities/NoteFiltersEntity';

type Props = {
  noteId: string;
  filters: NoteFiltersEntity;
}

export const Filters = ({ noteId, filters: filtersProp }: Props) => {
  const dispatch = useAppDispatch();
  const { mutateAsync } = useUpdatePostsSettingsFilters(noteId, filtersProp.id);
  const filters = React.useMemo(() => omit(filtersProp, 'id'), [filtersProp]);

  const handleSubmit = React.useCallback(async (values) => {
    await mutateAsync(values);
  }, [mutateAsync]);

  return (
    <>
      <IconButton
        px="2"
        variant="outline"
        size="sm"
        onClick={() => dispatch(showModal({ id: modalIds.noteFilters }))}
      >
        <FilterIcon />
      </IconButton>
    
      <NoteFiltersModal
        filters={filters}
        onSubmit={handleSubmit}
      />
    </>
    
  );
};
