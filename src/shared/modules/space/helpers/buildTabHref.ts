import { router } from 'desktop/routes/router';

export const buildTabHref = () => {
  return router.buildLocation({ to: '/' });
};