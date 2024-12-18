const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/*
 * This is a custom ESLint configuration for use with
 * Next.js apps.
 */

module.exports = {
  extends: ["@5unwan/eslint-config/base", "plugin:@next/next/recommended", "plugin:storybook/recommended"],
  parserOptions: {
    project,
  },
  globals: {
    React: true,
    JSX: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  overrides: [
    {
      files: ["**/*.{test,spec}.*", "**/__tests__/**/*"],
      plugins: ["jest", "testing-library"],
      extends: [
        "plugin:jest/recommended",
        "plugin:jest-dom/recommended",
        "plugin:testing-library/react",
      ],
    },
  ],
  ignorePatterns: ["node_modules/", "dist/"],
};
