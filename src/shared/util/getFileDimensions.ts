export function getFileDimensions(file: File): Promise<{ width: number; height: number }> {
  if (file.type.startsWith('image/')) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        const img = new Image();
  
        img.onload = () => {
          resolve({ width: img.width, height: img.height });
        };
  
        img.onerror = () => {
          reject(new Error('Не удалось загрузить изображение'));
        };
  
        // @ts-ignore
        img.src = event.target?.result;
      };
  
      reader.onerror = () => {
        reject(new Error('Не удалось прочитать файл'));
      };
  
      reader.readAsDataURL(file);
    });
  }
 
  if (file.type.startsWith('video/')) {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';

      video.onloadedmetadata = function () {
        window.URL.revokeObjectURL(video.src);
        resolve({ width: video.videoWidth, height: video.videoHeight });
      };

      video.onerror = () => {
        reject(new Error('Не удалось прочитать файл'));
      };

      video.src = URL.createObjectURL(file);
    });
  }

  return Promise.resolve({ width: 0, height: 0 });
}