import EventEmitter from 'eventemitter3';
import keymirror from 'keymirror';

export const noteEmitter = new EventEmitter();

export const noteEvents = keymirror({
  foundDeletedPost: null,
});