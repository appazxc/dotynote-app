export const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600); // Get hours
  const minutes = Math.floor((time % 3600) / 60); // Convert hours remainder to minutes
  const seconds = Math.floor(time % 60).toString().padStart(2, '0'); // Convert minutes remainder to seconds
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds}`; // Format with hours
  }

  return `${minutes}:${seconds}`; // Format without hours
};