export function removeEmptyParagraphsFromEnd(html: string): string {
  // Find all empty p tags at the end of string
  const regex = /<div class="para"><\/div>\s*$/;
  let modifiedHtml = html.replace(regex, '');

  // Repeat the process until no more empty p tags found at the end
  while (modifiedHtml.match(regex)) {
    modifiedHtml = modifiedHtml.replace(regex, '');
  }

  return modifiedHtml;
}

export function keepNParagraphs(html: string, n: number): string {
  // Find all p tags
  const regex = /<p>.*?<\/p>/g;
  const paragraphs = html.match(regex) || [];

  // Keep only first n paragraphs
  const selectedParagraphs = paragraphs.slice(0, n);
  // Join them back into a string
  const modifiedHtml = selectedParagraphs.join('');

  return modifiedHtml;
}