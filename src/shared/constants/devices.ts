export const devices = {
  MOBILE: 'mobile',
  DESKTOP: 'desktop',
} as const;

export type Device = typeof devices[keyof typeof devices];