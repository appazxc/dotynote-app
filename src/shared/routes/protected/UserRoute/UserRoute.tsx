import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import ContentLoader from '../../../components/ContentLoader';
import { BACK_URL } from 'shared/constants/queryParams';
import { routeNames } from 'shared/constants/routeNames';
import { getUrl } from 'shared/helpers/router/getUrl';
import { useAppSelector } from 'shared/store/hooks';
import { selectIsAuthenticated, selectIsAuthLoading } from 'shared/store/slices/authSlice';

export const UserRoute = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isAuthLoading = useAppSelector(selectIsAuthLoading);
  const location = useLocation();

  if (isAuthenticated) {
    return <Outlet />;
  }

  if (isAuthLoading) {
    return <ContentLoader />;
  }

  return <Navigate 
    to={getUrl(routeNames.login, { queryParams: { [BACK_URL]: location.pathname } })}
  />;
};
