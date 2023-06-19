import * as React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom';
import Loadable from 'shared/components/Loadable';
import PageLoader from 'shared/components/PageLoader';

const fallback = { fallback: <PageLoader /> };

const Home = Loadable(() => import(/* HomePage */ 'desktop/pages/Home'), fallback);
const App = Loadable(() => import(/* AppPage */ 'desktop/pages/App'), fallback);
const NotFound = Loadable(() => import(/* NotFoundPage */ 'desktop/pages/NotFound'), fallback);

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
