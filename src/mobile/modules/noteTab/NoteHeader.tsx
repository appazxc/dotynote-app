import React from 'react';

import { Center, HStack, IconButton, Spinner } from '@chakra-ui/react';
import { useRouter } from '@tanstack/react-router';
import { BsArrowLeft } from 'react-icons/bs';
import { FaA } from 'react-icons/fa6';

import { useTabTitle } from 'shared/hooks/useTabTitle';
import { NoteMenu } from 'shared/modules/noteTab/components/NoteMenu';
import { PostsSearch } from 'shared/modules/noteTab/components/PostsSearch';
import { RwButton } from 'shared/modules/noteTab/components/RwButton';
import { rwModes } from 'shared/modules/noteTab/constants';
import { useIsNoteMutating } from 'shared/modules/noteTab/hooks/useIsNoteMutating';
import { useTabContext } from 'shared/modules/space/components/TabProvider';
import { noteSettingsSelector } from 'shared/selectors/entities';
import { selectCanWriteNote } from 'shared/selectors/user/selectCanWriteNote';
import { selectRwMode } from 'shared/selectors/user/selectRwMode';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { toggleAdvancedEdit, toggleSearch } from 'shared/store/slices/appSlice';
import { NoteEntity } from 'shared/types/entities/NoteEntity';

import { LayoutHeader } from 'mobile/components/Layout';
import { router } from 'mobile/modules/space/tabRoutes/router';

type Props = {
  note: NoteEntity,
  isPrimary?: boolean,
  search: string,
  onSearchChange: (value: string) => void,
}

export const NoteHeader = (props: Props) => {
  const { note: { id: noteId, postsSettingsId, settingsId }, isPrimary, search, onSearchChange } = props;
  const { history } = useRouter();
  const dispatch = useAppDispatch();
  const tab = useTabContext();
  const title = useTabTitle(tab.routes[tab.routes.length - 1], router);
  const isMutating = useIsNoteMutating(noteId);
  const showRwMode = useAppSelector(state => selectCanWriteNote(state, { noteId }));
  const rwMode = useAppSelector(state => selectRwMode(state, { noteId }));
  const { isAdvancedEditActive, isSearchActive } = useAppSelector(state => state.app.note);
  const lastIsAdvancedEditActive = React.useRef(isAdvancedEditActive);
  const noteSettings = useAppSelector(state => noteSettingsSelector.getById(state, settingsId));
  const lastIsSearchActive = React.useRef(isSearchActive);
  const firstPageOfPrimaryNote = isPrimary && tab.routes.length === 1;
  const showSearch = !!postsSettingsId;
  const isNoteContentHidden = noteSettings?.display === false;

  const renderedBackButton = React.useMemo(() => {
    if (firstPageOfPrimaryNote) {
      return null;
    }

    return (
      <IconButton
        size="sm"
        aria-label="Note back"
        icon={<BsArrowLeft size="18" />}
        isDisabled={tab.routes.length <= 1}
        variant="unstyled"
        colorScheme="brand"
        display="inline-flex"
        onClick={() => history.back()}
      />
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
    if (!showRwMode || isNoteContentHidden) {
      return null;
    }

    return (
      <RwButton
        rwMode={rwMode}
      />
    ); 
  }, [showRwMode, rwMode, isNoteContentHidden]);

  const renderedAdvancedEditButton = React.useMemo(() => {
    if (!showRwMode || rwMode !== rwModes.WRITE || isNoteContentHidden) {
      return null;
    }

    return (
      <IconButton
        size="sm"
        position="relative"
        icon={<FaA />}
        aria-label="Advanced Edit"
        variant={isAdvancedEditActive ? 'solid' : 'ghost'}
        colorScheme="gray"
        onClick={() => dispatch(toggleAdvancedEdit())}
      />
    );
  }, [dispatch, showRwMode, rwMode, isAdvancedEditActive, isNoteContentHidden]);

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
        title={title}
      />
    )
  );
};
