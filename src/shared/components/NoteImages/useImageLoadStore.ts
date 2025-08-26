import { create } from 'zustand';

type ImageLoadState = {
  isLoaded: boolean;
  isError: boolean;
};

type ImageLoadStore = {
  images: Record<string, ImageLoadState>;
  setImageLoaded: (imageId: string) => void;
  setImageError: (imageId: string) => void;
  resetImageState: (imageId: string) => void;
  getImageState: (imageId: string) => ImageLoadState;
};

export const defaultImageState: ImageLoadState = {
  isLoaded: false,
  isError: false,
};

export const useImageLoadStore = create<ImageLoadStore>((set, get) => ({
  images: {},
  
  setImageLoaded: (imageId: string) => {
    set((state) => ({
      images: {
        ...state.images,
        [imageId]: {
          isLoaded: true,
          isError: false,
        },
      },
    }));
  },
  
  setImageError: (imageId: string) => {
    set((state) => ({
      images: {
        ...state.images,
        [imageId]: {
          isLoaded: false,
          isError: true,
        },
      },
    }));
  },
  
  resetImageState: (imageId: string) => {
    set((state) => ({
      images: {
        ...state.images,
        [imageId]: {
          isLoaded: false,
          isError: false,
        },
      },
    }));
  },
  
  getImageState: (imageId: string) => {
    const state = get();
    return state.images[imageId] || defaultImageState;
  },
}));