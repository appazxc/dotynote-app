import React from 'react';

import { HTTP_CODES } from 'shared/constants/httpCodes';
import { parseApiError } from 'shared/helpers/api/getApiError';

import { DefaultErrorComponent } from 'desktop/modules/space/tabRoutes/DefaultErrorComponent';
import { ForbiddenNoteTabError } from 'desktop/modules/space/tabRoutes/note/ForbiddenNoteTabError';

type Props = {
  error: unknown,
  reset: () => void,
};

export const NoteTabError = React.memo((props: Props) => {
  const parsedError = parseApiError(props.error);
  console.log('parsedError', parsedError);

  if (parsedError.statusCode === HTTP_CODES.FORBIDDEN) {
    return <ForbiddenNoteTabError error={parsedError} />;
  }

  return (
    <DefaultErrorComponent reset={props.reset} error={props.error} />
  );
});
