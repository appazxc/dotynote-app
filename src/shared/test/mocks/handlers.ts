import { rest } from 'msw';

import { appSession } from '../stubs/appSession';
import { me } from '../stubs/user';

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

  rest.get(getHandlerUrl('/user/me/account'), (req, res, ctx) => {
    return res(
      ctx.json({
        id: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
        name: 'Dima',
      })
    );
  }),
  rest.get(getHandlerUrl('/3'), (req, res, ctx) => {
    return res(
      ctx.json({
        id: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
        name: 'Dima',
      })
    );
  }),
  rest.get(getHandlerUrl('/4'), (req, res, ctx) => {
    return res(
      ctx.json({
        id: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
        name: 'Dima',
      })
    );
  }),
  rest.get(getHandlerUrl('/5'), (req, res, ctx) => {
    return res(
      ctx.json({
        id: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
        name: 'Dima',
      })
    );
  }),
];
