import { setupSentry } from 'shared/analytics/setupSentry';

export const initialize = async () => {
  const origCreateObjectURL = URL.createObjectURL;
  URL.createObjectURL = function(blob) {
    console.trace('Blob created:', blob);
    return origCreateObjectURL.call(this, blob);
  };

  setupSentry();
};
