import { api } from 'shared/api';

export async function downloadImage(imageUrl: string, filename: string) {
  const response = await api.get<Blob>(imageUrl, {}, {
    responseType: 'blob',
  });

  // Создаем Blob из данных ответа
  const blob = new Blob([response]);

  // Создаем ссылку на Blob
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;

  // Программно кликаем по ссылке
  document.body.appendChild(a);
  a.click();

  // Удаляем ссылку и освобождаем память
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}