export const getIsSelected = (noteId: string, isSelecting: boolean, selectedNotes: string[]) => {
  if (!isSelecting) {
    return false;
  }

  return selectedNotes.includes(noteId);
};