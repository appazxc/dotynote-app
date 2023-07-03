import { LoaderFunctionArgs } from 'react-router-dom';
import { AppStore } from 'shared/store';

type Args = LoaderFunctionArgs & { store: AppStore};

export type RouteLoader = (args: Args) => Promise<void | null>;
