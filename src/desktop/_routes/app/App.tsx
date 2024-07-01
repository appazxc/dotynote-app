import React from 'react';

import { useAppDispatch } from 'shared/store/hooks';
import { open, close } from 'shared/store/slices/appSlice';

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
