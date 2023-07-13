// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const CracoEnvPlugin = require('craco-plugin-env');

module.exports = {
  webpack: {
    alias: {
      shared: path.resolve(__dirname, 'src/shared'),
      desktop: path.resolve(__dirname, 'src/desktop'),
      mobile: path.resolve(__dirname, 'src/mobile'),
    },
  },
  eslint: {
    enable: false,
  },
  typescript: {
    enableTypeChecking: false,
  },
  plugins: [
    {
      plugin: CracoEnvPlugin,
      options: {
        variables: {
          MOCK: process.env.MOCK === 'true',
        },
      },
    },
  ],
};
