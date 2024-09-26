export const getIsSelected = (postId: number, isSelecting: boolean, selectedPosts: number[]) => {
  if (!isSelecting) {
    return false;
  }

  return selectedPosts.includes(postId);
};