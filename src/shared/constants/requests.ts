export const PAGE_SIZE = 25;

export const loadMoreDirection = {
  PREVIOUS: 'previous',
  NEXT: 'next',
  AROUND: 'around',
} as const;

export type LoadMoreDirection = typeof loadMoreDirection[keyof typeof loadMoreDirection]