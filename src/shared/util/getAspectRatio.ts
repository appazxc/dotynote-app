export const getAspectRatio = (width, height) => {
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b)); // НОД для сокращения дроби
  const divisor = gcd(width, height);
  return `${width / divisor}/${height / divisor}`;
};