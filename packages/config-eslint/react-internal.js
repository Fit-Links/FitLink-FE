const { resolve } = require("node:path");
const { overrides } = require("./base");

const project = resolve(process.cwd(), "tsconfig.json");

/*
 * This is a custom ESLint configuration for use a library
 * that utilizes React.
 */

module.exports = {
  extends: [
    "@5unwan/eslint-config/base",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@tanstack/query/recommended",
  ],
  parserOptions: {
    project,
  },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react/function-component-definition": ["error", { namedComponents: ["function-declaration"] }],
    "react/jsx-key": "error",
    "react/jsx-fragments": ["error", "syntax"],
  },
  globals: {
    React: true,
    JSX: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  env: {
    node: true,
    browser: true,
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
  ignorePatterns: ["node_modules/", "dist/", ".eslintrc.js", "**/*.css"],
};
