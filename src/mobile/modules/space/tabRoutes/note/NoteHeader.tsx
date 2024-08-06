import React from 'react';

import { Center, HStack, IconButton, Spinner } from '@chakra-ui/react';
import { useRouter } from '@tanstack/react-router';
import { BsArrowLeft } from 'react-icons/bs';
import { FaA } from 'react-icons/fa6';

import { useTabTitle } from 'shared/hooks/useTabTitle';
import { useTabContext } from 'shared/modules/space/components/TabProvider';
import { NoteMenu } from 'shared/modules/space/tabRoutes/note/components/NoteMenu';
import { RwButton } from 'shared/modules/space/tabRoutes/note/components/RwButton';
import { rwModes } from 'shared/modules/space/tabRoutes/note/constants';
import { useIsNoteMutating } from 'shared/modules/space/tabRoutes/note/hooks/useIsNoteMutating';
import { selectCanWriteNote } from 'shared/selectors/user/selectCanWriteNote';
import { selectRwMode } from 'shared/selectors/user/selectRwMode';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { toggleAdvancedEdit } from 'shared/store/slices/appSlice';

import { TabHeader } from 'mobile/modules/space/components/TabHeader';
import { router } from 'mobile/modules/space/tabRoutes/router';

type Props = {
  noteId: number,
}

export const NoteHeader = ({ noteId }: Props) => {
  const { history } = useRouter();
  const dispatch = useAppDispatch();
  const tab = useTabContext();
  const title = useTabTitle(tab.routes[tab.routes.length - 1], router);
  const isMutating = useIsNoteMutating(noteId);
  const showRwMode = useAppSelector(state => selectCanWriteNote(state, { noteId }));
  const rwMode = useAppSelector(state => selectRwMode(state, { noteId }));
  const { isAdvancedEditActive } = useAppSelector(state => state.app.note);

  const renderedBackButton = React.useMemo(() => {
    return (
      <IconButton
        size="sm"
        aria-label="Note back"
        icon={<BsArrowLeft size="18" />}
        onClick={() => history.back()}
        isDisabled={tab.routes.length <= 1}
        variant="unstyled"
        colorScheme="brand"
        display="inline-flex"
      />
    );
  }, [tab.routes.length, history]);

  const renderedMenu = React.useMemo(() => {
    return isMutating ? (
      <Center h="32px" w="32px">
        <Spinner size="sm" />
      </Center>
    ) : (
      <NoteMenu
        isMobile
        noteId={noteId}
        place="noteMobileHeader"
      />
    ); 
  }, [isMutating, noteId]);

  const renderedRwButton = React.useMemo(() => {
    if (!showRwMode) {
      return null;
    }

    return (
      <RwButton
        rwMode={rwMode}
        label={rwMode === rwModes.READ ? 'Note edit' : 'Note read'}
      />
    ); 
  }, [showRwMode, rwMode]);

  const renderedAdvancedEditButton = React.useMemo(() => {
    if (!showRwMode || rwMode !== rwModes.WRITE) {
      return null;
    }

    return (
      <IconButton
        size="sm"
        position="relative"
        icon={<FaA />}
        aria-label="Advanced Edit"
        variant={isAdvancedEditActive ? 'solid' : 'ghost'}
        onClick={() => dispatch(toggleAdvancedEdit())}
      />
    );
  }, [dispatch, showRwMode, rwMode, isAdvancedEditActive]);

  const renderedRightSide = React.useMemo(() => {
    return <HStack gap="2">{renderedAdvancedEditButton}{renderedRwButton}{renderedMenu}</HStack>;
  }, [renderedMenu, renderedRwButton, renderedAdvancedEditButton]);

  return (
    <TabHeader
      left={renderedBackButton}
      right={renderedRightSide}
    >
      {title}
    </TabHeader>
  );
};
