/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@5unwan/eslint-config/react-internal", "plugin:storybook/recommended"],
  env: {
    browser: true,
  },
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
};
