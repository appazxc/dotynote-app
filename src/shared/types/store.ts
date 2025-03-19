import { store } from 'shared/store';

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppStore = typeof store

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

export type ThunkAction<T = any> = (
  dispatch: AppDispatch,
  getState: () => AppState
) => T extends Promise<any> ? Promise<UnwrapPromise<T>> : T;
