import React from 'react';
import { open, close } from 'shared/store/slices/appSlice';
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
