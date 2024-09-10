import React from 'react';

import { spaceTabSelector } from 'shared/selectors/entities';
import { selectActiveSpace } from 'shared/selectors/space/selectActiveSpace';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

import { createPrimaryNoteTab } from 'mobile/actions/createPrimaryNoteTab';
import Space from 'mobile/modules/space';
import { selectPrimaryNoteTabId } from 'mobile/selectors/app/selectPrimaryNoteTabId';

export const PrimaryNote = React.memo(() => {
  const dispatch = useAppDispatch();
  const space = useAppSelector(selectActiveSpace);
  const tabId = useAppSelector(selectPrimaryNoteTabId);
  const tab = useAppSelector(state => spaceTabSelector.getEntityById(state, tabId));

  invariant(space, 'Missing space');

  React.useEffect(() => {
    if (tabId) {
      return;
    }

    dispatch(createPrimaryNoteTab());
  }, [tabId, dispatch]);

  if (!tab) {
    return null;
  }
  
  return (
    <Space tab={tab} />
  );
});

export default PrimaryNote;