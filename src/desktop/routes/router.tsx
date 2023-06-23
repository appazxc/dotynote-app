import * as React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
  Route
} from 'react-router-dom';
import Loadable from 'shared/components/Loadable';
import PageLoader from 'shared/components/PageLoader';

const fallback = { fallback: <PageLoader /> };

const Home = Loadable(() => import(/* HomePage */ 'desktop/routes/Home'), fallback);
const App = Loadable(() => import(/* AppPage */ 'desktop/routes/App'), fallback);
const NotFound = Loadable(() => import(/* NotFoundPage */ 'desktop/routes/NotFound'), fallback);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/app" element={<App />} />
      <Route path="*" element={<NotFound />} loader={() => {
        console.log('loader notfound');
        return redirect('/');
      }} />
    </>
  )
);

export default router;
