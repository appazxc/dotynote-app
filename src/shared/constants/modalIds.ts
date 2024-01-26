import keymirror from 'keymirror';

export const modalIds = keymirror({
  confirm: null,
  info: null,
  createSpace: null,
  createNote: null,
});

export type ModalId = keyof typeof modalIds;
