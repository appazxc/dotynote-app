import React from 'react';

import { useAppDispatch } from 'shared/store/hooks';

function App() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(open());
    return () => {
      dispatch(close());
    };
  }, [dispatch]);

  return null;
}

export { App };
