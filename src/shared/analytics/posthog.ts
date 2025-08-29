import { useRouter } from '@tanstack/react-router';
import posthog from 'posthog-js';
import * as React from 'react';

// Types for PostHog events
export type PostHogEvent =
  // Authentication
  | 'user_login'
  | 'user_login_failed'
  | 'user_logout'
  | 'user_registration'

  // Notes
  | 'note_created'
  | 'note_updated'
  | 'note_deleted'
  | 'note_opened'

  // Posts
  | 'post_created'
  | 'post_pinned'
  | 'post_unpinned'
  | 'post_deleted'

  // Files
  | 'file_upload_started'
  | 'file_upload_completed'
  | 'file_upload_failed'
  | 'file_deleted'
  | 'image_uploaded'
  | 'video_uploaded'
  | 'audio_uploaded'

  // Navigation
  | 'page_view'
  | 'search_performed'
  | 'tab_opened'
  | 'tab_closed'

  // Billing
  | 'billing_plan_selected'
  | 'credits_used'
  | 'payment_completed';

// Event properties types
export type EventProperties = Record<string, any>;

export type UserProperties = {
  user_id?: string;
  email?: string;
  username?: string;
  plan?: string;
  credits_remaining?: number;
};

/**
 * Track custom events in PostHog
 */
export const trackEvent = (event: PostHogEvent, properties?: EventProperties) => {
  try {
    posthog.capture(event, properties);
  } catch (error) {
    console.warn('Failed to track PostHog event:', error);
  }
};

/**
 * Identify user in PostHog
 */
export const identifyUser = (userId: string, properties?: UserProperties) => {
  try {
    posthog.identify(userId, properties);
  } catch (error) {
    console.warn('Failed to identify user in PostHog:', error);
  }
};

/**
 * Reset user identity (on logout)
 */
export const resetUser = () => {
  try {
    posthog.reset();
  } catch (error) {
    console.warn('Failed to reset user in PostHog:', error);
  }
};

/**
 * Track page views
 */
export const trackPageView = (page: string, properties?: EventProperties) => {
  trackEvent('page_view', {
    page,
    ...properties,
  });
};

/**
 * Hook to automatically track page views using TanStack Router
 */
export const usePageViewTracking = () => {
  const router = useRouter();

  React.useEffect(() => {
    // Track initial page load
    const currentPath = router.state.location.pathname;
    trackPageView(currentPath);

    // Subscribe to navigation changes using history
    const unsubscribe = router.history.subscribe((location: any) => {
      if (location.pathname) {
        trackPageView(location.pathname, {
          search: location.search,
          hash: location.hash,
        });
      }
    });

    return unsubscribe;
  }, [router]);
};