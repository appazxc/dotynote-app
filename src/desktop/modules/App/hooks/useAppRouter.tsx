import { createMemoryRouter } from 'react-router-dom';
import React from 'react';
import { spaceTabSelector } from 'shared/selectors';
import { useAppSelector } from 'shared/store/hooks';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';

import HomePage from '../routes/HomePage';
import NotePage from '../routes/NotePage';

const routes = [
  {
    path: '/note/:id',
    element: <NotePage />,
  },
  {
    path: '/',
    element: <HomePage />,
  },
];

function getMemoryRouterParams(spaceTab: SpaceTabEntity | null) {
  if (!spaceTab) {
    return {
      initialEntries: ['/'],
      initialIndex: 0,
    };
  }

  return {
    initialEntries: ['/'],
    initialIndex: 0,
  };
}

export const useAppRouter = (activeSpaceTabId?: string) => {
  const spaceTab = useAppSelector(state => spaceTabSelector.getById(state, activeSpaceTabId));

  const router = React.useMemo(() => {
    const router = createMemoryRouter(routes, getMemoryRouterParams(spaceTab));

    return router;
    // updating only when the space tab is changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spaceTab?.id]);

  React.useEffect(() => {
    function updateSpaceTabRoutes(action) {
      console.log('action', action);
    }

    const unsubscribe = router.subscribe(updateSpaceTabRoutes);

    return unsubscribe;
  }, [router]);

  return router;
};
