import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = React.lazy(() => import(/* HomePage */ 'desktop/pages/Home'));
const NotFound = React.lazy(() => import(/* NotFoundPage */ 'desktop/pages/NotFound'));

function Pages() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Pages;
