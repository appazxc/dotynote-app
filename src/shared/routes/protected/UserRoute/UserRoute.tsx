import React from 'react';
import { Navigate, Outlet } from 'react-router';
import PageLoader from 'shared/components/PageLoader';
import { routeNames } from 'shared/constants/routeNames';
import { getUrl } from 'shared/helpers/router/getUrl';
import { useAppSelector } from 'shared/store/hooks';
import { selectIsAuthenticated, selectIsAuthLoading } from 'shared/store/slices/authSlice';

export const UserRoute = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isAuthLoading = useAppSelector(selectIsAuthLoading);

  if (isAuthenticated) {
    console.log('outlet isAuthenticated');

    return <Outlet />;
  }

  if (isAuthLoading) {
    console.log('outlet isAuthLoading');

    return <PageLoader />;
  }
  console.log('outlet navigate');

  return <Navigate to={getUrl(routeNames.home)} />;
};
