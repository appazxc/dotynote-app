const log = console;

const IS_TEST = import.meta.env.MODE === 'test';

// The purpose is to log the error anyway
// through our logger (sentry), but we still need to break the execution flow,
// so we use a service error that doesn't get logged anywhere
export const INVARIANT_ERROR_MESSAGE = '__INVARIANT_ERROR_MESSAGE__';
export class InvariantError extends Error {
  constructor() {
    super(INVARIANT_ERROR_MESSAGE);

    this.name = 'InvariantError';
  }
}

const makeInvariantError = (message: string, params?: unknown) => {
  if (import.meta.env.MODE === 'development') {
    const paramsString = JSON.stringify(params, null, 2) || '';

    return new Error(`${message}${paramsString ? `: ${paramsString}` : ''}`);
  }

  return new InvariantError();
};

export function proxyInvariant<T>(
  value: T | undefined | null,
  falsyErrorMessage: string,
  errorParams?: unknown
): T {
  if (!value) {
    const error = makeInvariantError(falsyErrorMessage, errorParams);
    log.error(falsyErrorMessage, { ...(errorParams || {}), invariantStack: error.stack });
    throw error;
  }

  return value;
}

export function invariant<T>(
  value: T | undefined | null,
  falsyErrorMessage: string,
  errorParams?: unknown
): asserts value {
  if (!value) {
    const error = makeInvariantError(falsyErrorMessage, errorParams);
    if (!IS_TEST) {
      log.error(falsyErrorMessage, { ...(errorParams || {}), invariantStack: error.stack });
    }
    
    throw error;
  }
}
