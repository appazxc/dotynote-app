import React from 'react';

import { Box, Button, Card, Text } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';

import { openTab } from 'shared/actions/space/openTab';
import { useUpdateUserSettings } from 'shared/api/hooks/useUpdateUserSettings';
import { NoteInPost } from 'shared/components/NoteInPost';
import { modalIds } from 'shared/constants/modalIds';
import { ConfirmModal } from 'shared/containers/modals/ConfirmModal';
import { buildNoteTabRoute } from 'shared/helpers/buildNoteTabRoute';
import { hideModal, showModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';
import { startHubOperation } from 'shared/store/slices/appSlice';
import { NoteEntity } from 'shared/types/entities/NoteEntity';

type Props = {
  hub?: NoteEntity | null
}

export const HubSettings = React.memo(({ hub }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useUpdateUserSettings();

  const handleSet = React.useCallback(() => {
    dispatch(startHubOperation());
    navigate({ to: '/app' });
  }, [dispatch, navigate]);

  const handleRemove = React.useCallback(() => {
    mutateAsync({
      hubId: null,
    }).finally(() => dispatch(hideModal()));
  }, [mutateAsync, dispatch]);

  const handleNoteClick = React.useCallback(() => {
    if (!hub) {
      return;
    }

    dispatch(openTab({ 
      route: buildNoteTabRoute(hub.id),
      active: true,
    }));
    navigate({ to: '/app' });
  }, [dispatch, navigate, hub]);

  return (
    <>
      <Card p="4">
        <Box>
          <Text fontWeight="600">Hub note</Text>
          <Text color="gray.400" fontSize="sm">
            All notes you create will automatically be attached to the note you select here.
          </Text>
          {hub?.id ? (
            <Box mt="4">
              <Box
                display="flex"
                justifyContent="end"
                mb="2"
              >
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => {
                    dispatch(showModal({ id: modalIds.confirm }));
                  }}
                >
                  Remove
                </Button>
              </Box>
              <NoteInPost noteId={hub?.id} onClick={handleNoteClick} />
            </Box>
          ) : (
            <Button
              mt="4"
              isLoading={isPending}
              onClick={handleSet}
            >
              Set
            </Button>
          )}
          
        </Box>
      </Card>
      <ConfirmModal
        title="Remove hub note"
        description="All unsticked notes will stick once a new hub is created"
        isLoading={isPending}
        onConfirm={handleRemove}
      />
    </>
  );
});
