export async function downloadFile(url: string, filename: string = 'Untitled') {
  // Создаем Blob из данных ответа
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;

  // Программно кликаем по ссылке
  document.body.appendChild(a);
  a.click();

  // Удаляем ссылку и освобождаем память
  document.body.removeChild(a);
}