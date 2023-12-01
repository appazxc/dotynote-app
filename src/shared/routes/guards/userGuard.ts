import { redirect } from "react-router";
import { authoriseUser } from "shared/actions/auth";
import { BACK_URL } from "shared/constants/queryParams";
import { routeNames } from "shared/constants/routeNames";
import { selectIsAuthorized, selectToken } from "shared/store/slices/authSlice";
import { Guard } from "shared/types/common/router";
import { buildUrl } from "shared/util/router/buildUrl";

export const userGuard: Guard = async ({ store, request }) => {
  const state = store.getState();

  const isAuthorized = selectIsAuthorized(state);
  const token = selectToken(state);
  const { pathname } = new URL(request.url);
  
  if (!isAuthorized && !token) {
    return redirect(buildUrl({ routeName: routeNames.login, queryParams: { [BACK_URL]: pathname } }));
  }

  if (token && !isAuthorized) {
    await store.dispatch(authoriseUser());
  }
};