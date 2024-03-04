import { store } from 'shared/store';

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppStore = typeof store

export type ThunkAction<T = any> = (dispatch: AppDispatch, getState: () => AppState) => T | Promise<T>;

export type AppThunk<ArgType = void, OptionType = void> =
  (ArgType: ArgType, OptionType: OptionType) => ThunkAction;
