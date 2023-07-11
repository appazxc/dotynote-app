import { LoaderFunctionArgs, LoaderFunction } from 'react-router-dom';
import { AppStore } from 'shared/store';

type Args = LoaderFunctionArgs & { store: AppStore};

type RouteLoaderReturnValue = void | null;

export type RouteLoader = (args: Args) => ReturnType<LoaderFunction> | Promise<RouteLoaderReturnValue> | RouteLoaderReturnValue;

export type QueryParams = {
  [key: string]: any
}

export type PathParams = {
  [key: string]: any
}
