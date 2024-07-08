import { createRoute } from '@tanstack/react-router';

import { root } from '../root';

export const about = createRoute({
  getParentRoute: () => root,
  path: 'about',
  component: function About() {
    return <div className="p-2">Hello from About!</div>;
  },
});