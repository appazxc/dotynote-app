import { DefaultBodyType, rest } from "msw";

import { entityNames } from "shared/constants/entityNames";

import { createResponse } from "./helpers/createResponse";
import { getHandlerUrl } from "./helpers/getHandlerUrl";
import { createNote } from "./stubs/note";
import { getNotePosts } from "./stubs/post";

export const handlers = [
  rest.get(getHandlerUrl("/notes/:id/posts"), (req, res, ctx) => {
    const { id } = req.params;
    const cursor = req.url.searchParams.get("cursor") || "";
    const direction = req.url.searchParams.get("direction") || "";

    return res(ctx.json(createResponse(entityNames.post, getNotePosts(id, cursor, direction))));
  }),

  rest.get<DefaultBodyType, { ids: string[] }>(getHandlerUrl("/notes"), (req, res, ctx) => {
    const ids = (req.url.searchParams.get("ids") || "").split(",");

    return res(ctx.json(createResponse(entityNames.note, ids.map(createNote))));
  }),

  rest.get<DefaultBodyType, { id: string }>(getHandlerUrl("/notes/:id"), (req, res, ctx) => {
    const { id } = req.params;

    return res(ctx.json(createResponse(entityNames.note, createNote(id))));
  }),
];
