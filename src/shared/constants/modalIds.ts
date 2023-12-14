import keymirror from 'keymirror';

export const modalIds = keymirror({
  confirm: null,
});

export type ModalId = keyof typeof modalIds;
