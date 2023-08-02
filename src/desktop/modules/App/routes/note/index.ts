import { NotePage } from './NotePage';
import { loader } from './loader';

export default async function() {
  return {
    Component: NotePage,
    loader,
  };
}
