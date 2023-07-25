import { Button } from '@chakra-ui/react';
import React from 'react';
import {
  RouterProvider,
  createMemoryRouter,
} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { fetchSpaceTabs, fetchUserSpace, selectAppSession } from 'shared/store/slices/appSlice';
import {
  useQuery,
} from '@tanstack/react-query';
import { NotFoundPage } from 'desktop/routes/NotFound';

import HomePage from './routes/HomePage';
import NotePage from './routes/NotePage';
import { AppLayout } from './components/AppLayout';
import { AppLayoutError } from './components/AppLayoutError';

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

function App() {
  const appSession = useAppSelector(selectAppSession);
  const dispatch = useAppDispatch();

  const { data: spaceId, isLoading: spaceIsLoading, isError: spaceError } = useQuery({
    queryKey: ['space', appSession?.activeSpaceId],
    queryFn: () => dispatch(fetchUserSpace(appSession?.activeSpaceId)),
    enabled: !!appSession,
  });

  const { isLoading: spaceTabsIsLoading, isError: spaceTabsError } = useQuery({
    queryKey: ['spaceTabs', appSession?.activeSpaceId],
    queryFn: () => dispatch(fetchSpaceTabs(appSession?.activeSpaceId)),
    enabled: !!appSession,
  });

  if (!appSession) {
    return <NotFoundPage />;
  }

  if (spaceError || spaceTabsError) {
    return <AppLayoutError />;
  }

  return (
    <AppLayout isLoading={spaceIsLoading || spaceTabsIsLoading} spaceId={spaceId} />
  );
}

// function App() {
//   const [activeNoteSpace, setActiveNoteSpace] = React.useState(1);
//   const router = React.useMemo(() => {
//     return createMemoryRouter(routes, {
//       initialEntries: ['/', `/note/${activeNoteSpace}`],
//       initialIndex: 1,
//     });
//   }, [activeNoteSpace]);

//   return (
//     <div>
//       App inside
//       <Button onClick={() => setActiveNoteSpace(x => x + 1)}>Сменить заметку</Button>
//       <RouterProvider router={router} />
//     </div>
//   );
// }

export default App;
