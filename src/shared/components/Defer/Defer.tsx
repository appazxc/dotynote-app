import React from 'react';

import { Await, useLoaderData } from 'react-router-dom';

export const Defer = ({ element, loader }) => {
  const data = useLoaderData() as { defer: Promise<unknown> };

  return (
    <React.Suspense fallback={loader || null}>
      <Await resolve={data.defer}>
        {element}
      </Await>
    </React.Suspense>
  );
};
