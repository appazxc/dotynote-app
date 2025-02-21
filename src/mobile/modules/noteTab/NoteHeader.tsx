import { Center, HStack, IconButton, Spinner } from '@chakra-ui/react';
import { useRouter } from '@tanstack/react-router';
import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { FaA } from 'react-icons/fa6';

import { NoteMenu } from 'shared/modules/noteTab/components/NoteMenu';
import { PostsSearch } from 'shared/modules/noteTab/components/PostsSearch';
import { RwButton } from 'shared/modules/noteTab/components/RwButton';
import { rwModes } from 'shared/modules/noteTab/constants';
import { useIsNoteMutating } from 'shared/modules/noteTab/hooks/useIsNoteMutating';
import { useTabContext } from 'shared/modules/space/components/TabProvider';
import { selectCanWriteNote } from 'shared/selectors/user/selectCanWriteNote';
import { selectRwMode } from 'shared/selectors/user/selectRwMode';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { toggleAdvancedEdit, toggleSearch } from 'shared/store/slices/appSlice';
import { NoteEntity } from 'shared/types/entities/NoteEntity';

import { LayoutHeader } from 'mobile/components/Layout';

type Props = {
  note: NoteEntity;
  isPrimary?: boolean;
  search: string;
  onSearchChange: (value: string) => void;
}

export const NoteHeader = (props: Props) => {
  const { note: { id: noteId, title = '', postsSettings, settings }, isPrimary, search, onSearchChange } = props;
  const { history } = useRouter();
  const dispatch = useAppDispatch();
  const tab = useTabContext();
  const isMutating = useIsNoteMutating();
  const showRwMode = useAppSelector(state => selectCanWriteNote(state, { noteId }));
  const rwMode = useAppSelector(state => selectRwMode(state, { noteId }));
  const { isAdvancedEditActive, isSearchActive } = useAppSelector(state => state.app.note);
  const lastIsAdvancedEditActive = React.useRef(isAdvancedEditActive);
  const lastIsSearchActive = React.useRef(isSearchActive);
  const firstPageOfPrimaryNote = isPrimary && tab.routes.length === 1;
  const showSearch = !!postsSettings;
  const isNoteContentVisible = !settings?.hide;
  const showTitle = !isNoteContentVisible && title;

  const renderedBackButton = React.useMemo(() => {
    if (firstPageOfPrimaryNote) {
      return null;
    }

    return (
      <IconButton
        size="sm"
        aria-label="Note back"
        disabled={tab.routes.length <= 1}
        variant="plain"
        display="inline-flex"
        iconSize="auto"
        onClick={() => history.back()}
      >
        <BsArrowLeft size="20" />
      </IconButton>
    );
  }, [tab.routes.length, history, firstPageOfPrimaryNote]);

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
    return <HStack gap="2">{renderedAdvancedEditButton}{renderedRwButton}{renderedMenu}</HStack>;
  }, [renderedMenu, renderedRwButton, renderedAdvancedEditButton]);

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
        left={renderedBackButton}
        right={renderedRightSide}
        pl={firstPageOfPrimaryNote ? '4' : '2'}
        title={showTitle ? title : undefined}
      />
    )
  );
};
