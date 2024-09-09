export function removeEmptyParagraphsFromEnd(html: string): string {
  // Находим все пустые p в конце строки
  const regex = /<p><\/p>\s*$/;
  let modifiedHtml = html.replace(regex, '');

  // Повторяем процесс до тех пор, пока находим пустые p в конце
  while (modifiedHtml.match(regex)) {
    modifiedHtml = modifiedHtml.replace(regex, '');
  }

  return modifiedHtml;
}

export function keepNParagraphs(html: string, n: number): string {
  // Находим все p
  const regex = /<p>.*?<\/p>/g;
  const paragraphs = html.match(regex) || [];

  // Оставляем только первые n div
  const selectedParagraphs = paragraphs.slice(0, n);
console.log('html', html);
  // Собираем их обратно в строку
  const modifiedHtml = selectedParagraphs.join('');

  return modifiedHtml;
}