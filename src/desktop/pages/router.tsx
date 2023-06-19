import * as React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom';
import Loadable from 'shared/components/Loadable';

const Home = Loadable(() => import(/* HomePage */ 'desktop/pages/Home'));
const App = Loadable(() => import(/* AppPage */ 'desktop/pages/App'));
const NotFound = Loadable(() => import(/* NotFoundPage */ 'desktop/pages/NotFound'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/app" element={<App />} />
      <Route path="*" element={<NotFound />} />
    </>
  )
);

export default router;
