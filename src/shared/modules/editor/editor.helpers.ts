export function removeEmptyDivsFromEnd(html: string): string {
  // Находим все пустые div в конце строки
  const regex = /<div><\/div>\s*$/;
  let modifiedHtml = html.replace(regex, '');

  // Повторяем процесс до тех пор, пока находим пустые div в конце
  while (modifiedHtml.match(regex)) {
    modifiedHtml = modifiedHtml.replace(regex, '');
  }

  return modifiedHtml;
}

export function keepNDivs(html: string, n: number): string {
  // Находим все div
  const regex = /<div>.*?<\/div>/g;
  const divs = html.match(regex) || [];

  // Оставляем только первые n div
  const selectedDivs = divs.slice(0, n);

  // Собираем их обратно в строку
  const modifiedHtml = selectedDivs.join('');

  return modifiedHtml;
}