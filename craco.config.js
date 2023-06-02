// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

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
};
