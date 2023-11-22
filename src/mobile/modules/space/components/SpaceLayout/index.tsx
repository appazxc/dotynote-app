import React from 'react';

type Props = {
  children: React.ReactNode,
}

export const SpaceLayout = (props: Props) => {
  return (
    <div>{props.children}</div>
  );
};
