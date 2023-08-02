import * as React from 'react';
import { LoaderFunctionArgs, LoaderFunction } from 'react-router-dom';
import { RouteName } from 'shared/constants/routeNames';
import { AppStore } from 'shared/store';

type Args = LoaderFunctionArgs & { store: AppStore};

type RouteLoaderReturnValue = void | null;

export type RouteLoader = (args: Args) => 
  ReturnType<LoaderFunction> | Promise<RouteLoaderReturnValue> | RouteLoaderReturnValue;

export type QueryParams = {
  [key: string]: any
}

export type PathParams = {
  [key: string]: any
}

export type RouteResolverReturnType = {
  Component?: React.ComponentType,
  element?: React.ReactNode,
  loader?: RouteLoader,
  deferLoader?: RouteLoader,
  loaderComponent?: React.ReactElement
}

export type RouteResolver = () => RouteResolverReturnType

export type RouteDictionary = {
  [key in RouteName]: () => Promise<{ default: RouteResolver }>
};
