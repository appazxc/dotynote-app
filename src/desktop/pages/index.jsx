import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loadable from 'shared/components/Loadable';

const Home = Loadable(React.lazy(() => import(/* HomePage */ 'desktop/pages/Home')));
const App = Loadable(React.lazy(() => import(/* AppPage */ 'desktop/pages/App')));
const NotFound = Loadable(React.lazy(() => import(/* NotFoundPage */ 'desktop/pages/NotFound')));

function Pages() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<App />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Pages;
