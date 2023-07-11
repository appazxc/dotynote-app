import React from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import PageLoader from 'shared/components/PageLoader';

export const Defer = ({ element, loader }) => {
  const data = useLoaderData() as { defer: Promise<unknown> };
  console.log('inside Defer', element);
  
  return (
    <React.Suspense fallback={loader || <PageLoader />}>
      <Await resolve={data.defer}>
        {element}
      </Await>
    </React.Suspense>
  );
};
