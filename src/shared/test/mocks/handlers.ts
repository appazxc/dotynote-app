import { DefaultBodyType, rest } from 'msw';
import { wait } from 'shared/utils/wait';

import { appSession } from '../stubs/appSession';
import { me } from '../stubs/user';
import { activeUserSpace } from '../stubs/space';
import { activeUserSpaceTabs } from '../stubs/spaceTab';
import { createNote } from '../stubs/note';

import { getHandlerUrl } from './helpers/getHandlerUrl';
import { fillEntities } from './helpers/fillEntities';

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
    return res(
      ctx.json({
        data: me.id,
        entities: fillEntities({
          user: [me],
        }),
      })
    );
  }),

  rest.get(getHandlerUrl('/app/session'), (req, res, ctx) => {
    return res(
      ctx.json({
        data: appSession.id,
        entities: fillEntities({
          appSession: [appSession],
        }),
      })
    );
  }),

  rest.get(getHandlerUrl('/spaces/1'), (req, res, ctx) => {
    return res(
      ctx.json({
        data: activeUserSpace.id,
        entities: fillEntities({
          space: [activeUserSpace],
        }),
      })
    );
  }),

  rest.get(getHandlerUrl('/spaces/1/tabs'), async (req, res, ctx) => {
    return res(ctx.json({
      data: activeUserSpaceTabs.map(({ id }) => id),
      entities: fillEntities({
        spaceTab: activeUserSpaceTabs,
      }),
    }));
  }),

  rest.get(getHandlerUrl('/notes/:id/posts'), (req, res, ctx) => {
    return res(
      ctx.json({
        id: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
        name: 'Dima',
      })
    );
  }),
  rest.get<DefaultBodyType, { id: string }>(getHandlerUrl('/notes/:id'), (req, res, ctx) => {
    const { id } = req.params;

    return res(
      ctx.json({
        data: id,
        entities: {
          note: {
            [id]: createNote(id),
          },
        },
      })
    );
  }),
];
