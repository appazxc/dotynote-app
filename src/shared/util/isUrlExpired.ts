import { hour } from 'shared/constants/time';

export function isUrlExpired(url?: string, gracePeriod = hour) {
  if (!url) {
    return true;
  }

  const urlObj = new URL(url);
  const params = new URLSearchParams(urlObj.search);

  const amzDate = params.get('X-Amz-Date'); // 20250305T033857Z
  const amzExpires = parseInt(params.get('X-Amz-Expires') || '0', 10); // Если null — ставим 0

  if (!amzDate || isNaN(amzExpires) || amzExpires <= 0) {
    console.error('Некорректные параметры ссылки');
    return true; // Считаем ссылку протухшей
  }

  const date = new Date(
    Date.UTC(
      parseInt(amzDate.slice(0, 4)), // Год
      parseInt(amzDate.slice(4, 6)) - 1, // Месяц (нумерация с 0)
      parseInt(amzDate.slice(6, 8)), // День
      parseInt(amzDate.slice(9, 11)), // Часы
      parseInt(amzDate.slice(11, 13)), // Минуты
      parseInt(amzDate.slice(13, 15)) // Секунды
    )
  );

  const expirationTime = date.getTime() + amzExpires * 1000; // Время окончания ссылки
  const now = Date.now();
  
  return now > expirationTime - gracePeriod; // Если осталось меньше gracePeriod, считаем стухшей
}