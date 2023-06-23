import React from 'react';
import { open, close } from 'shared/state/app/app.slice';
import { useAppDispatch } from 'shared/state/hooks';

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

export default React.memo(App);
