import React from 'react';

import { Button, Link } from '@chakra-ui/react';
import { Outlet, createRoute, useParams } from '@tanstack/react-router';

import { DesktopTabLink } from 'desktop/modules/space/components/DesktopTabLink';
import { SettingsLayout } from 'desktop/modules/space/components/SettingsLayout';

import { root } from '../root';

export const settingsRoot = createRoute({
  getParentRoute: () => root,
  path: 'settings',
  component: () => (
    <SettingsLayout>
      Settings
      <div>
        <Link
          as={DesktopTabLink}
          to="/settings/$id"
          params={{ id: '2' }}
        >
        second
        </Link>
      </div>
      <div>
        <Link
          as={DesktopTabLink}
          to="/settings/$id"
          params={{ id: '3' }}
        >
        third
        </Link>
      </div>
      <Outlet />
    </SettingsLayout>
  ),
});

export const settingsIndex = createRoute({
  getParentRoute: () => settingsRoot,
  path: '/',
  component: () => null,
});
export const settingsId = createRoute({
  getParentRoute: () => settingsRoot,
  path: '$id',
  component: function Settings() {
    const { id } = useParams({ strict: false });
    const [count, setCount] = React.useState(0);
    console.log('id', id, count);
    return <Button onClick={() => setCount(x => x +1)}>id: {id} count: {count}</Button>
    ;
  },
});

export const settings = settingsRoot.addChildren([settingsId, settingsIndex]);