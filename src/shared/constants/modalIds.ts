import keymirror from 'keymirror';

export const modalIds = keymirror({
  confirm: null,
  info: null,
  createSpace: null,
  editSpace: null,
  createNote: null,
  selectNote: null,
  createPost: null,
  createPostWithImages: null,
  url: null,
  selectConcretePlace: null,
  primaryNote: null,
  noteVideo: null,
  notImplementedBilling: null,
  insufficientCredits: null,  
  noteFilters: null,
  storageCapacityReached: null,
});

export type ModalId = keyof typeof modalIds;
