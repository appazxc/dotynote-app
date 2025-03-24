export function getFileDuration(file: File): Promise<number> {
  if (file.type.startsWith('audio/')) {
    return new Promise((resolve) => {
      const audio = new Audio();
      audio.src = URL.createObjectURL(file);
      audio.onloadedmetadata = () => {
        URL.revokeObjectURL(audio.src);
        resolve(audio.duration);
      };
    });
  }

  return Promise.resolve(0);
}