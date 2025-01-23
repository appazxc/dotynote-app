export const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600); // Находим часы
  const minutes = Math.floor((time % 3600) / 60); // Остаток от часов переводим в минуты
  const seconds = Math.floor(time % 60).toString().padStart(2, '0'); // Остаток от минут переводим в секунды
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds}`; // Формат с часами
  }

  return `${minutes}:${seconds}`; // Формат без часов
};