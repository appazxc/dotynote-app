import { redirect } from "react-router";
import { routeNames } from "shared/constants/routeNames";
import { selectToken } from "shared/store/slices/authSlice";
import { Guard } from "shared/types/common/router";
import { buildUrl } from "shared/util/router/buildUrl";

export const guestGuard: Guard = async ({ store }) => {
  const state = store.getState();
  const token = selectToken(state);

  if (token) {
    return redirect(buildUrl({ routeName: routeNames.app }));
  }
};