import { Directions, DIRECTIONS } from 'shared/constants/requests';

const cursorNameMap = {
  [DIRECTIONS.NEXT]: 'after',
  [DIRECTIONS.PREVIOUS]: 'before',
  [DIRECTIONS.AROUND]: 'around',
};

export const getCursorName = (direction: Directions) => {
  return cursorNameMap[direction];
};