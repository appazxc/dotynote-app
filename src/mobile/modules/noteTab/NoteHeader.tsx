import { Center, HStack, IconButton, Spinner } from '@chakra-ui/react';
import React from 'react';
import { FaA } from 'react-icons/fa6';

import { InfoIcon } from 'shared/components/ui/icons';
import { Tooltip } from 'shared/components/ui/tooltip';
import { useIsPrimaryNote } from 'shared/hooks/useIsPrimaryNote';
import { NoteMenu } from 'shared/modules/noteTab/components/NoteMenu';
import { PostsSearch } from 'shared/modules/noteTab/components/PostsSearch';
import { RwButton } from 'shared/modules/noteTab/components/RwButton';
import { rwModes } from 'shared/modules/noteTab/constants';
import { useIsNoteMutating } from 'shared/modules/noteTab/hooks/useIsNoteMutating';
import { useNoteMutationError } from 'shared/modules/noteTab/hooks/useNoteMutationError';
import { useTabContext } from 'shared/modules/space/components/TabProvider';
import { selectActiveSpace } from 'shared/selectors/space/selectActiveSpace';
import { selectCanWriteNote } from 'shared/selectors/user/selectCanWriteNote';
import { selectRwMode } from 'shared/selectors/user/selectRwMode';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { toggleAdvancedEdit, toggleSearch } from 'shared/store/slices/appSlice';
import { NoteEntity } from 'shared/types/entities/NoteEntity';

import { LayoutHeader } from 'mobile/components/LayoutHeader';

type Props = {
  note: NoteEntity;
  search: string;
  onSearchChange: (value: string) => void;
}

export const NoteHeader = (props: Props) => {
  const { note: { id: noteId, title = '', postsSettings, settings }, search, onSearchChange } = props;
  const dispatch = useAppDispatch();
  const tab = useTabContext();
  const isPrimary = useIsPrimaryNote();
  const space = useAppSelector(selectActiveSpace);
  const isMutating = useIsNoteMutating(noteId);
  const mutationError = useNoteMutationError(noteId);
  const showRwMode = useAppSelector(state => selectCanWriteNote(state, { noteId }));
  const rwMode = useAppSelector(state => selectRwMode(state, { noteId }));
  const { isAdvancedEditActive, isSearchActive } = useAppSelector(state => state.app.note);
  const lastIsAdvancedEditActive = React.useRef(isAdvancedEditActive);
  const lastIsSearchActive = React.useRef(isSearchActive);
  const firstPageOfPrimaryNote = isPrimary && space?.mainNoteId === noteId;
  const showSearch = !!postsSettings;
  const isNoteContentVisible = !settings?.hide;
  const showTitle = !isNoteContentVisible && title;

  const renderedError = React.useMemo(() => {
    if (!mutationError) {
      return null;
    }
  
    return (
      <Center h="32px" w="32px">
        <Tooltip
          key={mutationError}
          content={`Save error: ${mutationError}`}
          openDelay={1000}
          positioning={{ placement: 'bottom' }}
        >
          <IconButton
            aria-label={mutationError}
            size="xs"
            colorPalette="red"
            variant="subtle"
          >
            <InfoIcon />
          </IconButton>
        </Tooltip>
      </Center>
    );
  }, [mutationError]);

  const renderedMenu = React.useMemo(() => {
    return isMutating ? (
      <Center h="32px" w="32px">
        <Spinner size="sm" />
      </Center>
    ) : (
      <NoteMenu
        isMobile
        noteId={noteId}
        showSearch={showSearch}
      />
    ); 
  }, [isMutating, showSearch, noteId]);

  const renderedRwButton = React.useMemo(() => {
    if (!showRwMode || !isNoteContentVisible) {
      return null;
    }

    return (
      <RwButton
        rwMode={rwMode}
      />
    ); 
  }, [showRwMode, rwMode, isNoteContentVisible]);

  const renderedAdvancedEditButton = React.useMemo(() => {
    if (!showRwMode || rwMode !== rwModes.WRITE || !isNoteContentVisible) {
      return null;
    }

    return (
      <IconButton
        size="xs"
        position="relative"
        aria-label="Advanced Edit"
        variant={isAdvancedEditActive ? 'subtle' : 'ghost'}
        onClick={() => dispatch(toggleAdvancedEdit())}
      >
        <FaA />
      </IconButton>
    );
  }, [dispatch, showRwMode, rwMode, isAdvancedEditActive, isNoteContentVisible]);

  const renderedRightSide = React.useMemo(() => {
    return <HStack gap="2">{renderedAdvancedEditButton}{renderedRwButton}{renderedError}{renderedMenu}</HStack>;
  }, [renderedMenu, renderedRwButton, renderedAdvancedEditButton, renderedError]);

  React.useEffect(() => {
    lastIsAdvancedEditActive.current = isAdvancedEditActive;
  }, [isAdvancedEditActive]);

  React.useEffect(() => {
    lastIsSearchActive.current = isSearchActive;
  }, [isSearchActive]);

  React.useEffect(() => () => {
    if (lastIsAdvancedEditActive.current) {
      dispatch(toggleAdvancedEdit());
    }
  }, [dispatch]);

  React.useEffect(() => () => {
    if (lastIsSearchActive.current) {
      dispatch(toggleSearch());
    }
  }, [dispatch, noteId]);

  return (
    isSearchActive ? (
      <PostsSearch
        showCancelButton
        value={search}
        onChange={onSearchChange}
      />
    ) : (
      <LayoutHeader
        showBackButton={!firstPageOfPrimaryNote}
        isBackButtonDisabled={tab.routes.length <= 1}
        right={renderedRightSide}
        pl={firstPageOfPrimaryNote ? '4' : '2'}
        title={showTitle ? title : undefined}
      />
    )
  );
};
