import { AnyRoute } from '@tanstack/react-router';

type GetRouteParams<TParentRoute extends AnyRoute = AnyRoute> = {
  getParentRoute: () => TParentRoute;
  Layout?: React.ComponentType<{ children: React.ReactNode }>;
}

type RouteCreator = (params: GetRouteParams) => AnyRoute;

export const createSharedRoute = (
  getRoute: RouteCreator
): RouteCreator => {
  return (params: GetRouteParams) => getRoute(params);
};