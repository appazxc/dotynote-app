import keymirror from 'keymirror';

export const modalIds = keymirror({
  confirm: null,
  info: null,
  createSpace: null,
  editSpace: null,
  createNote: null,
  selectNote: null,
  editPostSettings: null,
  createPost: null,
  url: null,
});

export type ModalId = keyof typeof modalIds;
