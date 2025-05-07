export const getIsSelected = (postId: string, isSelecting: boolean, selectedPosts: string[]) => {
  if (!isSelecting) {
    return false;
  }

  return selectedPosts.includes(postId);
};