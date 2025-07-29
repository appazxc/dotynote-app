import React from 'react';

import { selectActiveSpace } from 'shared/selectors/space/selectActiveSpace';
import { useAppSelector } from 'shared/store/hooks';

import { EmptyPrimaryNote } from 'mobile/routes/primaryNote/EmptyPrimaryNote';
import { PrimaryNote } from 'mobile/routes/primaryNote/PrimaryNote';

export const PrimaryNoteBase = React.memo(() => {
  const activeSpace = useAppSelector(selectActiveSpace);
  const hasMainNote = !!activeSpace?.mainNoteId;

  if (!hasMainNote) {
    return <EmptyPrimaryNote />;
  }

  return (
    <PrimaryNote />
  );
});

export default PrimaryNoteBase;