import React from 'react';

type Route = {
  name: string;
}

type Props = {
  tabId: string;
  routes: Route[];
};

export const DotnoteMemoryRouter = (props: Props) => {
  return (
    <div>DotnoteMemoryRouter</div>
  );
};
