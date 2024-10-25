export const DEFAULT_PAGE_SIZE = 25;
export const MAX_PAGE_SIZE = 100;

export const DIRECTIONS = {
  PREVIOUS: 'previous',
  NEXT: 'next',
  AROUND: 'around',
} as const;

export type Directions = typeof DIRECTIONS[keyof typeof DIRECTIONS]

export const SORT = {
  DESC: 'desc',
  ASC: 'asc',
} as const;

export type Sort = typeof SORT[keyof typeof SORT]