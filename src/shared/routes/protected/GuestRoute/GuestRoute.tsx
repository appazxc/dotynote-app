import React from 'react';
import { Navigate, Outlet } from 'react-router';
import ContentLoader from 'shared/components/ContentLoader';
import { routeNames } from 'shared/constants/routeNames';
import { getUrl } from 'shared/helpers/router/getUrl';
import { useAppSelector } from 'shared/store/hooks';
import { selectIsAuthenticated, selectIsAuthLoading } from 'shared/store/slices/authSlice';

export const GuestRoute = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isAuthLoading = useAppSelector(selectIsAuthLoading);

  if (isAuthenticated) {
    return <Navigate to={getUrl(routeNames.home)} />;
  }

  if (isAuthLoading) {
    return <ContentLoader />;
  }

  return <Outlet />;
};
