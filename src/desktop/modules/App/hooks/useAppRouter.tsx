import { createMemoryRouter } from 'react-router-dom';
import React from 'react';
import { spaceTabSelector } from 'shared/selectors';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';
import { RouterState } from '@remix-run/router';

import { handleAppRouteChange } from '../actions/route/handleAppRouteChange';
import NoteTab from '../tabs/note';
import HomeTab from '../tabs/home';
import Untabed from '../tabs/untabed';

const routes = [
  {
    path: '/notes/:noteId',
    element: <NoteTab />,
  },
  {
    path: '/',
    element: <HomeTab />,
  },
  {
    path: '*',
    element: <Untabed />,
  },
];

function getMemoryRouterParams(spaceTab: SpaceTabEntity) {
  return {
    initialEntries: spaceTab.routes,
    initialIndex: spaceTab.routes.length - 1,
  };
}

export const useAppRouter = (spaceTab: SpaceTabEntity) => {
  const dispatch = useAppDispatch();

  const router = React.useMemo(() => {
    const router = createMemoryRouter(routes, getMemoryRouterParams(spaceTab));

    return router;
    // updating only when the space tab is changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spaceTab?.id]);

  React.useEffect(() => {
    function handleChange(action: RouterState) {
      dispatch(handleAppRouteChange(action));
    }

    const unsubscribe = router.subscribe(handleChange);

    return unsubscribe;
  }, [router, dispatch]);

  return router;
};
