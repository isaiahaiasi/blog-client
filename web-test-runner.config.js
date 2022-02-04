/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
process.env.NODE_ENV = 'test';

module.exports = {
  plugins: [require('@snowpack/web-test-runner-plugin')()],
};
