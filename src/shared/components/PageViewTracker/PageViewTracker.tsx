import { usePageViewTracking } from 'shared/analytics/posthog';

/**
 * Component for automatic page view tracking
 * Should be rendered inside RouterProvider
 */
export const PageViewTracker = () => {
  usePageViewTracking();
  return null;
};
