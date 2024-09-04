import React from 'react';

import { Center, HStack, IconButton, Spinner, Text } from '@chakra-ui/react';
import { useRouter } from '@tanstack/react-router';
import { BsArrowLeft } from 'react-icons/bs';
import { FaA } from 'react-icons/fa6';

import { useTabTitle } from 'shared/hooks/useTabTitle';
import { NoteHeaderSearch } from 'shared/modules/noteTab/components/NoteHeaderSearch';
import { NoteMenu } from 'shared/modules/noteTab/components/NoteMenu';
import { RwButton } from 'shared/modules/noteTab/components/RwButton';
import { rwModes } from 'shared/modules/noteTab/constants';
import { useIsNoteMutating } from 'shared/modules/noteTab/hooks/useIsNoteMutating';
import { useTabContext } from 'shared/modules/space/components/TabProvider';
import { selectCanWriteNote } from 'shared/selectors/user/selectCanWriteNote';
import { selectRwMode } from 'shared/selectors/user/selectRwMode';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { toggleAdvancedEdit, toggleSearch } from 'shared/store/slices/appSlice';

import { LayoutHeader } from 'mobile/components/Layout';
import { router } from 'mobile/modules/space/tabRoutes/router';

type Props = {
  noteId: number,
  isPrimary?: boolean,
  showSearch?: boolean,
  search: string,
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

export const NoteHeader = (props: Props) => {
  const { noteId, isPrimary, showSearch, search, onSearchChange } = props;
  const { history } = useRouter();
  const dispatch = useAppDispatch();
  const tab = useTabContext();
  const title = useTabTitle(tab.routes[tab.routes.length - 1], router);
  const isMutating = useIsNoteMutating(noteId);
  const showRwMode = useAppSelector(state => selectCanWriteNote(state, { noteId }));
  const rwMode = useAppSelector(state => selectRwMode(state, { noteId }));
  const { isAdvancedEditActive, isSearchActive } = useAppSelector(state => state.app.note);
  const lastIsAdvancedEditActive = React.useRef(isAdvancedEditActive);
  const lastIsSearchActive = React.useRef(isSearchActive);

  const renderedBackButton = React.useMemo(() => {
    if (isPrimary) {
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
  }, [tab.routes.length, history, isPrimary]);

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
    if (!showRwMode) {
      return null;
    }

    return (
      <RwButton
        rwMode={rwMode}
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
    <>
      <LayoutHeader
        left={renderedBackButton}
        right={renderedRightSide}
        pl={isPrimary ? '4' : '2'}
        title={title}
      />
      {isSearchActive && (
        <NoteHeaderSearch
          showCancelButton
          value={search}
          onChange={onSearchChange}
        />
      )}
    </>
  );
};
