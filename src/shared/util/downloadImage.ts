import { api } from 'shared/api';
import { toaster } from 'shared/components/ui/toaster';

export async function downloadImage(imageUrl: string, filename: string) {
  let response: Blob | null = null;
  try {
    response = await api.get<Blob>(imageUrl, {}, {
      responseType: 'blob',
    });
  } catch(error) {
    toaster.create({
      title: 'Error',
      description: 'Failed to download image',
      type: 'error',
    });
  }

  if (!response) {
    return;
  }

  // Create Blob from response data
  const blob = new Blob([response]);

  // Create link to Blob
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;

  // Programmatically click the link
  document.body.appendChild(a);
  a.click();

  // Remove link and free memory
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}