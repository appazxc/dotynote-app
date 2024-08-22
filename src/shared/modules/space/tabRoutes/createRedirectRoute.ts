import { AnyRoute, createRoute, redirect } from '@tanstack/react-router';

export const createRedirectRoute = 
  <P extends string, T, R extends AnyRoute>(path: P, to: T, parentRoute: () => R) => 
    createRoute({
      getParentRoute: parentRoute,
      path,
      beforeLoad: () => {
        return redirect({
          to,
        });
      },
    });