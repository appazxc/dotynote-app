export async function downloadFile(url: string, filename: string = 'Untitled') {
  // Create link element for download
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;

  // Programmatically click the link
  document.body.appendChild(a);
  a.click();

  // Remove link and clean up
  document.body.removeChild(a);
}