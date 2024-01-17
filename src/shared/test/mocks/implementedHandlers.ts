import { rest } from "msw";

import { getHandlerUrl } from "./helpers/getHandlerUrl";

export const implementedHandlers = [
  rest.post(getHandlerUrl('/auth/send-code-email'), async (req, res, ctx) => {
    const { email } = await req.json<{ email: string }>();

    return res(ctx.status(200));
  }),

  rest.post(getHandlerUrl("/auth/login-email"), async (req, res, ctx) => {
    const { email, code } = await req.json<{ email: string; code: string }>();

    return res(
      ctx.json({
        token: "tokenId",
      })
    );
  }),
];
