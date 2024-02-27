import { DefaultBodyType, rest } from 'msw';

import { entityNames } from 'shared/constants/entityNames';

import { createResponse } from './helpers/createResponse';
import { getHandlerUrl } from './helpers/getHandlerUrl';
import { createNote } from './stubs/note';
import { createUserSpaces } from './stubs/space';
import { createSpaceTab } from './stubs/spaceTab';
import { me } from './stubs/user';

export const implementedHandlers = [
  rest.get(getHandlerUrl('/users/me'), (req, res, ctx) => {
    return res(ctx.json(createResponse(entityNames.user, me)));
  }),

  rest.post(getHandlerUrl('/auth/send-code-email'), async (req, res, ctx) => {
    const { email } = await req.json<{ email: string }>();

    return res(ctx.status(200));
  }),

  rest.post(getHandlerUrl('/auth/login-email'), async (req, res, ctx) => {
    const { email, code } = await req.json<{ email: string; code: string }>();

    return res(
      ctx.json({
        token: 'tokenId',
      })
    );
  }),

  rest.get(getHandlerUrl('/spaces'), (req, res, ctx) => {
    const userId = req.url.searchParams.get('userId') || '';
    const noEntities = req.url.searchParams.get('noEntities');

    return res(ctx.json(createResponse(entityNames.space, createUserSpaces(userId), noEntities === 'true')));
  }),

  rest.post(getHandlerUrl('/spaceTabs'), async (req, res, ctx) => {
    const { spaceId, routes } = await req.json<{ routes: string[]; spaceId: string }>();

    return res(ctx.json(createResponse(entityNames.spaceTab, createSpaceTab(spaceId, routes))));
  }),

  rest.patch(getHandlerUrl('/spaces/1'), (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.get<DefaultBodyType, { ids: string[] }>(getHandlerUrl('/notes'), (req, res, ctx) => {
    const ids = (req.url.searchParams.get('ids') || '').split(',');

    return res(ctx.json(createResponse(entityNames.note, ids.map(createNote))));
  }),

  rest.patch(getHandlerUrl('/spaceTabs/:id'), (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.get<DefaultBodyType, { id: string }>(getHandlerUrl('/notes/:id'), (req, res, ctx) => {
    const { id } = req.params;

    return res(ctx.json(createResponse(entityNames.note, createNote(id))));
  }),
];
