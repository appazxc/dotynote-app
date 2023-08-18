import { PAGE_SIZE, loadMoreDirection } from "shared/constants/requests";

const LAST_NOTE_CURSOR = 45;

export const getNotePosts = (noteId, cursorValue, direction) => {
  const cursor = parseInt(cursorValue) || 0;

  let startCursor = cursor;
  let size = PAGE_SIZE;
  if (direction === loadMoreDirection.AROUND) {
    startCursor = Math.max(0, startCursor - Math.floor(PAGE_SIZE / 2));
    startCursor = startCursor < LAST_NOTE_CURSOR - PAGE_SIZE ? startCursor : LAST_NOTE_CURSOR - PAGE_SIZE;
  }

  if (direction === loadMoreDirection.PREVIOUS) {
    startCursor = Math.max(0, cursor - PAGE_SIZE);
    size = startCursor < PAGE_SIZE ? cursor - 1 : PAGE_SIZE;
  }

  if (direction === loadMoreDirection.NEXT) {
    size = startCursor >= LAST_NOTE_CURSOR ? 0 : Math.min(LAST_NOTE_CURSOR - startCursor, PAGE_SIZE);
  }

  return [...Array(size)].map((_, index) => {
    const id = `${1 + startCursor + index}`;

    return ({
      id: id,
      note: {
        id: id,
        title: `Note #${id}`
      }
    });
  });
};