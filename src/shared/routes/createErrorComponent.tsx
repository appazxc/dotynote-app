import { ErrorComponentProps } from '@tanstack/react-router';
import React from 'react';

import { HTTP_CODES } from 'shared/constants/httpCodes';
import { parseApiError } from 'shared/helpers/api/getApiError';
import { AuthErrorComponent } from 'shared/routes/AuthErrorComponent';
import { DefaultErrorComponent } from 'shared/routes/DefaultErrorComponent';
import { ForbiddenErrorComponent } from 'shared/routes/ForbiddenErrorComponent';
import { logger } from 'shared/services/logger';
import { UnauthorizedError } from 'shared/util/errors';

type CreateErrorComponentProps = {
  Layout?: React.ComponentType<{ children: React.ReactNode }>,
  Link: React.ComponentType<{ to: string, children: React.ReactNode }>,
  ErrorComponent?: React.ComponentType<{ 
    error?: unknown, 
    Layout: React.ComponentType<{ children: React.ReactNode }>, 
    Link: React.ComponentType<{ to: string, children: React.ReactNode }>,
  }>,
}

export const createErrorComponent = (props: CreateErrorComponentProps) => {
  return ({ error, reset }: ErrorComponentProps) => {
    const {
      Layout = React.Fragment,
      Link,
      ErrorComponent = DefaultErrorComponent,
    } = props;
    const parsedError = parseApiError(error);
    
    React.useEffect(() => {
      if (parsedError.statusCode !== HTTP_CODES.FORBIDDEN) {
        logger.error('Default error component triggered', error);
      }
    }, [error, parsedError.statusCode]);

    const isAuthError = error instanceof UnauthorizedError;

    if (isAuthError) {
      return (
        <AuthErrorComponent
          Layout={Layout}
          error={error}
          reset={reset}
        />
      );
    }

    if (parsedError.statusCode === HTTP_CODES.FORBIDDEN) {
      return (
        <ForbiddenErrorComponent
          Layout={Layout}
          reason={parsedError.reason}
          reset={reset}
        />
      );
    }

    return (
      <ErrorComponent
        Layout={Layout}
        Link={Link}
      />
    );
  };
};