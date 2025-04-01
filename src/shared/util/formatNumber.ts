/**
 * Formats a number or string to include commas as thousand separators
 * @param value Number or string to format
 * @returns Formatted string with commas (e.g. 1,000,000)
 */
export const formatNumber = (value: number | string): string => {
  // Convert value to string if it's a number
  const stringValue = typeof value === 'number' ? value.toString() : value;
  
  // Use regex to add commas
  return stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}; 