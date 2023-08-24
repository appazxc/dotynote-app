import { DefaultBodyType, rest } from 'msw';
import { wait } from 'shared/util/wait';

import { appSession } from '../stubs/appSession';
import { me } from '../stubs/user';
import { activeUserSpace } from '../stubs/space';
import { activeUserSpaceTabs, createSpaceTab } from '../stubs/spaceTab';
import { createNote } from '../stubs/note';

import { getHandlerUrl } from './helpers/getHandlerUrl';
import { entityNames } from 'shared/constants/entityNames';
import { createResponse } from './helpers/createResponse';
import { getNotePosts } from '../stubs/post';

export const handlers = [
  rest.post(getHandlerUrl('/auth/send-code-email'), async (req, res, ctx) => {
    const { email } = await req.json<{ email: string }>();

    return res(ctx.status(200));
  }),

  rest.post(getHandlerUrl('/auth/login-email'), async (req, res, ctx) => {
    const { email, code } = await req.json<{ email: string, code: string }>();

    return res(
      ctx.json({
        token: 'tokenId',
      })
    );
  }),

  rest.get(getHandlerUrl('/users/me'), (req, res, ctx) => {
    return res(ctx.json(
      createResponse(entityNames.user, me)
    ));
  }),

  rest.get(getHandlerUrl('/app/session'), (req, res, ctx) => {
    return res(ctx.json(
      createResponse(entityNames.appSession, appSession)
    ));
  }),

  rest.get(getHandlerUrl('/spaces/1'), (req, res, ctx) => {
    return res(ctx.json(
      createResponse(entityNames.space, activeUserSpace)
    ));
  }),

  rest.get(getHandlerUrl('/spaces/1/tabs'), async (req, res, ctx) => {
    return res(ctx.json(
      createResponse(entityNames.spaceTab, activeUserSpaceTabs)
    ));
  }),

  rest.post(getHandlerUrl('/spaces/:id/tabs'), async (req, res, ctx) => {
    const id = req.params.id as string;
    const { path } = await req.json<{ path?: string }>();

    return res(ctx.json(
      createResponse(entityNames.spaceTab, createSpaceTab(id, path))
    ));
  }),

  rest.get(getHandlerUrl('/notes/:id/posts'), (req, res, ctx) => {
    const { id } = req.params;
    const cursor = req.url.searchParams.get('cursor') || '';
    const direction = req.url.searchParams.get('direction') || '';

    return res(ctx.json(
      createResponse(entityNames.post, getNotePosts(id, cursor, direction))
    ));
  }),

  rest.get<DefaultBodyType, { ids: string[] }>(getHandlerUrl('/notes'), (req, res, ctx) => {
    const ids = (req.url.searchParams.get('ids') || '').split(',');

    return res(ctx.json(
      createResponse(entityNames.note, ids.map(createNote))
    ));
  }),

  rest.get<DefaultBodyType, { id: string }>(getHandlerUrl('/notes/:id'), (req, res, ctx) => {
    const { id } = req.params;

    return res(ctx.json(
      createResponse(entityNames.note, createNote(id))
    ));
  }),
];
