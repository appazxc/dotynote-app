export const buildNoteTabRoute = (noteId: string | string, search: Record<string, string | number> = {}) => {
  const searchString = new URLSearchParams(search as any).toString();
  const searchStringResult = searchString ? `?${searchString}` : '';

  return `/n/${noteId}${searchStringResult}`;
};