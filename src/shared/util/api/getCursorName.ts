import { LoadMoreDirection, loadMoreDirection } from 'shared/constants/requests';

const cursorNameMap = {
  [loadMoreDirection.NEXT]: 'after',
  [loadMoreDirection.PREVIOUS]: 'before',
  [loadMoreDirection.AROUND]: 'around',
};

export const getCursorName = (direction: LoadMoreDirection) => {
  return cursorNameMap[direction];
};