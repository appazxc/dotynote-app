import { Config } from 'shared/types/config';

const config: Partial<Config> = {
  logging: {
    sentry: {
      enable: true,
      dsn: 'https://7ec5b7c3e09b3dce35e02da2d0515443@o4508204270878720.ingest.de.sentry.io/4508204274221136',
    },
  },
};

export default config;
