# Analytics Page View Tracking

This module provides automatic page view tracking using PostHog analytics for TanStack Router.

## Implementation

### usePageViewTracking Hook

The `usePageViewTracking` hook automatically tracks page views when users navigate between routes. It:

1. Tracks the initial page load when the component mounts
2. Subscribes to router history changes using `router.history.subscribe`
3. Sends page view events to PostHog with pathname, search, and hash parameters

### PageViewTracker Component

The `PageViewTracker` component is a utility component that renders nothing but activates the page view tracking. It's placed in the root routes of both desktop and mobile versions to ensure tracking works across the entire app.

### Location

- **Hook**: `src/shared/analytics/posthog.ts` - `usePageViewTracking()`
- **Component**: `src/shared/components/PageViewTracker/`
- **Integration**: Added to `src/desktop/routes/root/index.tsx` and `src/mobile/routes/root/index.tsx`

### Usage

The tracking is automatically enabled and no additional setup is required. Every navigation event will generate a `page_view` event in PostHog with the following properties:

```typescript
{
  page: string,        // Current pathname
  search?: string,     // URL search parameters
  hash?: string        // URL hash
}
```

### Testing

Page view tracking will work both for:
- Initial page loads
- Client-side navigation (SPA routing)
- Browser back/forward navigation
- Programmatic navigation

The tracking integrates seamlessly with the existing PostHog setup in the application.
