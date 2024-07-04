import { loader } from './loader';
import { NoteTab } from './NoteTab';

export default function() {
  return {
    Component: NoteTab,
    loader,
  };
}
