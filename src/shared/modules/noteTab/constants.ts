export const rwModes = {
  WRITE: 'write',
  READ: 'read',
} as const;

export type RwMode = typeof rwModes[keyof typeof rwModes]

export const addTo = {
  NOTE: 'note',
  POSTS: 'posts',
} as const;

export type AddTo = typeof addTo[keyof typeof addTo]