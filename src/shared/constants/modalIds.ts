import keymirror from 'keymirror';

export const modalIds = keymirror({
  confirm: null,
  info: null,
  createSpace: null,
  editSpace: null,
  createNote: null,
  selectNote: null,
  editPostsSettings: null,
  createPost: null,
  url: null,
  selectConcretePlace: null,
  primaryNote: null,
});

export type ModalId = keyof typeof modalIds;
