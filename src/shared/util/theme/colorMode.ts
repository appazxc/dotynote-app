export const colorMode = (lightColor, darkColor) => ({ colorMode }: { colorMode: 'light' | 'dark'}) => {
  if (colorMode === 'light') {
    return lightColor;
  }

  return darkColor;
};