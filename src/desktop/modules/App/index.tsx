import { Button } from '@chakra-ui/react';
import React from 'react';
import {
  RouterProvider,
  createMemoryRouter,
} from 'react-router-dom';

import HomePage from './components/routes/HomePage';
import NotePage from './components/routes/NotePage';

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
  const [activeNoteSpace, setActiveNoteSpace] = React.useState(1);
  
  const router = React.useMemo(() => {
    return createMemoryRouter(routes, {
      initialEntries: ['/', `/note/${activeNoteSpace}`],
      initialIndex: 1,
    });
  }, [activeNoteSpace]);

  return (
    <div>
      App inside
      <Button onClick={() => setActiveNoteSpace(x => x + 1)}>Сменить заметку</Button>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
