import { DEFAULT_PAGE_SIZE, DIRECTIONS } from 'shared/constants/requests';

import { createNote } from './note';

const LAST_NOTE_CURSOR = 45;

export const getNotePosts = (noteId, cursorValue, direction) => {
  const cursor = parseInt(cursorValue) || 0;

  let startCursor = cursor;
  let size = DEFAULT_PAGE_SIZE;
  if (direction === DIRECTIONS.AROUND) {
    startCursor = Math.max(0, startCursor - Math.floor(DEFAULT_PAGE_SIZE / 2));
    startCursor = startCursor < LAST_NOTE_CURSOR - DEFAULT_PAGE_SIZE ? startCursor : LAST_NOTE_CURSOR - DEFAULT_PAGE_SIZE;
  }

  if (direction === DIRECTIONS.PREVIOUS) {
    startCursor = Math.max(0, cursor - DEFAULT_PAGE_SIZE);
    size = startCursor < DEFAULT_PAGE_SIZE ? cursor - 1 : DEFAULT_PAGE_SIZE;
  }

  if (direction === DIRECTIONS.NEXT) {
    size = startCursor >= LAST_NOTE_CURSOR ? 0 : Math.min(LAST_NOTE_CURSOR - startCursor, DEFAULT_PAGE_SIZE);
  }

  return [...Array(size)].map((_, index) => {
    const id = `${1 + startCursor + index}`;

    return ({
      id: id,
      note: createNote(id),
    });
  });
};