import { Config } from 'shared/types/common/config';
import merge from 'lodash/merge';

const getConfig = (): Config => {
  const defaultConfig = require('./default.config');
  const productionConfig = require('./production.config');

  let localConfig: Partial<Config> = {};
  try {
    localConfig = require('./local.config');
  } catch (e) {}

  const config = process.env.NODE_ENV === 'production'
    ? merge(defaultConfig, productionConfig)
    : merge(defaultConfig, localConfig);

  return config;
};

export default getConfig();
