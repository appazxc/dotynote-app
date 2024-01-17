import { DefaultBodyType, rest } from 'msw';

import { entityNames } from 'shared/constants/entityNames';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';
import { wait } from 'shared/util/wait';

import { createResponse } from './helpers/createResponse';
import { getHandlerUrl } from './helpers/getHandlerUrl';
import { createNote } from './stubs/note';
import { getNotePosts } from './stubs/post';
import { activeUserSpace, createUserSpaces } from './stubs/space';
import { activeUserSpaceTabs, createSpaceTab } from './stubs/spaceTab';
import { me } from './stubs/user';

let preparedSpaceTab: SpaceTabEntity | null = createSpaceTab(null, []);

export const handlers = [
  rest.get(getHandlerUrl('/users/me'), (req, res, ctx) => {
    return res(ctx.json(
      createResponse(entityNames.user, me)
    ));
  }),

  rest.get(getHandlerUrl('/spaces/1'), (req, res, ctx) => {
    return res(ctx.json(
      createResponse(entityNames.space, activeUserSpace)
    ));
  }),

  rest.get(getHandlerUrl('/spaces'), (req, res, ctx) => {
    const userId = req.url.searchParams.get('userId') || '';
    const noEntities = req.url.searchParams.get('noEntities');

    return res(ctx.json(
      createResponse(entityNames.space, createUserSpaces(userId), noEntities === 'true')
    ));
  }),

  rest.patch(getHandlerUrl('/spaces/1'), (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.get(getHandlerUrl('/spaces/1/tabs'), async (req, res, ctx) => {
    return res(ctx.json(
      createResponse(entityNames.spaceTab, activeUserSpaceTabs)
    ));
  }),

  rest.post(getHandlerUrl('/spaceTabs'), async (req, res, ctx) => {
    const { spaceId, routes } = await req.json<{ routes: string[], spaceId: string }>();

    return res(ctx.json(
      createResponse(entityNames.spaceTab, createSpaceTab(spaceId, routes))
    ));
  }),

  rest.get(getHandlerUrl('/spaceTabs/prepared'), async (req, res, ctx) => {
    const response = createResponse(entityNames.spaceTab, [preparedSpaceTab]);

    return res(ctx.json(response));
  }),

  rest.post(getHandlerUrl('/spaceTabs/prepared'), async (req, res, ctx) => {
    preparedSpaceTab = createSpaceTab(null, []);

    const response = createResponse(entityNames.spaceTab, preparedSpaceTab);

    return res(ctx.json(response));
  }),

  rest.patch(getHandlerUrl('/spaceTabs/:id'), (req, res, ctx) => {
    return res(ctx.status(200));
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
