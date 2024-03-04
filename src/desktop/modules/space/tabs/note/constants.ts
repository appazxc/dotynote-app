export const rwModes = {
  WRITE: 'write',
  READ: 'read',
  NONE: 'none',
} as const;

export type RwMode = typeof rwModes[keyof typeof rwModes]