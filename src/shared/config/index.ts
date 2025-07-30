/* eslint-disable @typescript-eslint/no-require-imports */
import merge from 'lodash/merge';

import { Config } from 'shared/types/config';

const getLocalConfig = () => {
  if (import.meta.env.PROD) {
    return {};
  }

  let localConfig: Partial<Config> = {};
  try {
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
