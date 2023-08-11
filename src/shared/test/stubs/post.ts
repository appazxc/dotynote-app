

export const getNotePosts = (noteId, cursorValue) => {
  const cursor = parseInt(cursorValue) || 0;
  const pageSize = 5;

  return [...Array(pageSize)].map((_, index) => {
    const id = `${1 + cursor + index}`;

    return ({
      id: id,
      note: {
        id: id,
        title: `Note #${id}`
      }
    });
  });
};