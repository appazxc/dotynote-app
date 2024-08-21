import React from 'react';

import { TabProvider } from 'shared/modules/space/components/TabProvider';
import { selectActiveSpace } from 'shared/selectors/space/selectActiveSpace';
import { selectActiveSpaceId } from 'shared/selectors/space/selectActiveSpaceId';
import { useAppSelector } from 'shared/store/hooks';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';
import { invariant } from 'shared/util/invariant';

import { NoteTab } from 'mobile/modules/noteTab';
import { buildTabHref } from 'mobile/modules/space/helpers/buildTabHref';

export const PrimaryNote = React.memo(() => {
  const space = useAppSelector(selectActiveSpace);
  const spaceId = useAppSelector(selectActiveSpaceId)!;
  
  invariant(space?.mainNoteId, 'Missing primary note id');
  invariant(spaceId, 'Missing spaceId');
  
  const fakeTab: SpaceTabEntity = React.useMemo(() => ({
    id: 'fake',
    spaceId,
    routes: [buildTabHref({ to: '/n/$noteId', params: { noteId: String(space?.mainNoteId) } })],
    isPinned: false,
    pos: 1,
  }), [spaceId, space]);

  return (
    <TabProvider tab={fakeTab}>
      <NoteTab isPrimary noteId={space?.mainNoteId} />
    </TabProvider>
  );
});

export default PrimaryNote;