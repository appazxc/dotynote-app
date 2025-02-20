import { decode } from 'blurhash';

export function decodeBlurHash(blurHash: string, width: number, height: number) {
  const pixels = decode(blurHash, width, height);
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  
  const imageData = context!.createImageData(width, height);
  imageData.data.set(pixels);
  context!.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
}
