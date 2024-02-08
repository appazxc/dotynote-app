export const initialize = async () => {
  if (import.meta.env.MOCK === 'true') {
    const worker = require('shared/test/mocks/browser');
    await worker.start({
      onUnhandledRequest(request) {
        // Ignore any requests containing "cdn.com" in their URL.
        if (!request.url.pathname.includes('/api/v1')) {
          return;
        }

        // Otherwise, print an unhandled request warning.
        // console.log('onUnhandledRequest', request);
      },
    });
  }
};
