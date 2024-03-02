import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';
import { RouteLoader } from 'shared/types/common/router';

export const loader: RouteLoader = async ({ params }) => {
  const { noteId } = params;
  await queryClient.fetchQuery(options.notes.load(noteId));
};