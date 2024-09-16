import { DefaultBodyType, rest } from 'msw';

import { entityTypes } from 'shared/constants/entityTypes';

import { createResponse } from './helpers/createResponse';
import { getHandlerUrl } from './helpers/getHandlerUrl';
import { createNote } from './stubs/note';
import { getNotePosts } from './stubs/post';

export const handlers = [
  rest.get(getHandlerUrl('/notes/:id/posts'), (req, res, ctx) => {
    const { id } = req.params;
    const cursor = req.url.searchParams.get('cursor') || '';
    const direction = req.url.searchParams.get('direction') || '';

    return res(ctx.json(createResponse(entityTypes.post, getNotePosts(id, cursor, direction))));
  }),
];
