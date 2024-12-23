/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@5unwan/eslint-config/react-internal.js', 'plugin:storybook/recommended'],
  env: {
    browser: true,
  },
};