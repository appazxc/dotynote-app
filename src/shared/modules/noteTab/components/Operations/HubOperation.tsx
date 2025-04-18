import React from 'react';

import { useUpdateUserSettings } from 'shared/api/hooks/useUpdateUserSettings';
import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';
import { toaster } from 'shared/components/ui/toaster';
import { useBrowserNavigate } from 'shared/hooks/useBrowserNavigate';
import { useTabNote } from 'shared/modules/noteTab/hooks/useTabNote';
import { selectUser } from 'shared/selectors/user/selectUser';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { HubOperation as HubOperationType, stopOperation } from 'shared/store/slices/appSlice';
import { invariant } from 'shared/util/invariant';

import { Operation } from './Operation';

type Props = HubOperationType;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const HubOperation = React.memo((props: Props) => {
  const dispatch = useAppDispatch();
  const note = useTabNote();
  const user = useAppSelector(selectUser);
  const navigate = useBrowserNavigate();
  
  invariant(user, 'Missing user');

  const { mutateAsync, isPending } = useUpdateUserSettings();
  
  const handleHub = React.useCallback(async () => {
    mutateAsync({
      hubId: note.id,
    }).then(() => {
      navigate({ to: '/app/settings' });
      toaster.create({
        title: 'Hub has been configured',
        type: 'info',
      });
      dispatch(stopOperation());
      queryClient.invalidateQueries(options.notes.load(Number(note.id)));
    });
  }, [
    navigate,
    dispatch,
    note.id,
    mutateAsync,
  ]);

  const isUserNote = note.authorId === user.id;

  if (!isUserNote) {
    return (
      <Operation
        title="Impossible to set a hub note"
        description="This must be your note to set it as a hub"
        isLoading={isPending}
        onConfirm={handleHub}
      />
    );
  }
  
  return (
    <Operation
      title="Set as a hub"
      description="All new notes will auto stick to this note"
      isLoading={isPending}
      onConfirm={handleHub}
    />
  );
});
