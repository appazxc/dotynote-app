import React from 'react';
import { open, close } from 'shared/state/app/app.slice';
import { useAppDispatch } from 'shared/state/hooks';

function App() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    console.log('open');
    
    dispatch(open());
    return () => {
    console.log('close');

      dispatch(close());
    };
  }, []);

  return null;
}

export default React.memo(App);
