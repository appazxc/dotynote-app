import merge from 'lodash/merge';

import { Config } from 'shared/types/config';

const getLocalConfig = () => {
  if (import.meta.env.PROD) {
    return {};
  }

  let localConfig: Partial<Config> = {};
  try {
    // try dont work. hack in vite config
    localConfig = require('./local.config');
  } catch (e) {
    return localConfig;
  }

  return localConfig;
};

const getConfig = (): Config => {
  const defaultConfig = require('./default.config');
  const productionConfig = require('./production.config');
  const localConfig = getLocalConfig();

  const config = import.meta.env.MODE === 'production'
    ? merge(defaultConfig, productionConfig)
    : merge(defaultConfig, localConfig);

  return config;
};

export default getConfig();
