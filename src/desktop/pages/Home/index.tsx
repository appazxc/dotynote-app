import { Button, Stack } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { open, close, inc } from 'shared/state/app/app.slice';
import { decrement, increment } from 'shared/state/counter/counter.slice';
import { useAppDispatch, useAppSelector } from 'shared/state/hooks';

function Home() {
  const count = useAppSelector((state) => state.counter.value);
  const times = useAppSelector((state) => state.app.times);
  const isOpen = useAppSelector((state) => state.app.isOpen);

  const dispatch = useAppDispatch();

  return (
    <div>
      Home {count}
      <Stack direction='row' spacing={2} align='center'>
        <Button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </Button>
        <Button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </Button>
        <Button
          aria-label="Decrement value"
          onClick={() => dispatch(open())}
        >
          open
        </Button>
        <Button
          aria-label="Decrement value"
          onClick={() => dispatch(close())}
        >
          close
        </Button>
        <Button
          aria-label="Decrement value"
          onClick={() => dispatch(inc())}
        >
          inc {times} {String(isOpen)}
        </Button>
      </Stack>
      <Stack direction="column" spacing={2}>
        <Link to="/hello">any page</Link>
        <Link to="/app">app page</Link>
      </Stack>
    </div>
  );
}

export default Home;
