import { hour } from 'shared/constants/time';

export function isUrlExpired(url?: string, gracePeriod = hour) {
  if (!url) {
    return true;
  }

  const urlObj = new URL(url);
  const params = new URLSearchParams(urlObj.search);

  const amzDate = params.get('X-Amz-Date'); // 20250305T033857Z
  const amzExpires = parseInt(params.get('X-Amz-Expires') || '0', 10); // Set to 0 if null

  if (!amzDate || isNaN(amzExpires) || amzExpires <= 0) {
    console.error('Invalid URL parameters');
    return true; // Consider link as expired
  }

  const date = new Date(
    Date.UTC(
      parseInt(amzDate.slice(0, 4)), // Year
      parseInt(amzDate.slice(4, 6)) - 1, // Month (0-based)
      parseInt(amzDate.slice(6, 8)), // Day
      parseInt(amzDate.slice(9, 11)), // Hour
      parseInt(amzDate.slice(11, 13)), // Minute
      parseInt(amzDate.slice(13, 15)) // Second
    )
  );

  const expirationTime = date.getTime() + amzExpires * 1000; // Link expiration time
  const now = Date.now();
  
  return now > expirationTime - gracePeriod; // If less than gracePeriod remains, consider expired
}