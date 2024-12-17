const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "turbo",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project,
  },
  plugins: ["@typescript-eslint", "import", "unused-imports"],
  rules: {
    "unused-imports/no-unused-imports": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        groups: [
          "builtin",
          "external",
          "internal",
          ["parent", "sibling"],
          "index",
          "type",
          "unknown",
        ],
        pathGroups: [
          {
            pattern: "**/services/**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "**/components/**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "**/hooks/**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "**/constants/**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "**/utils/**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "**/types/**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "**/assets/**",
            group: "internal",
            position: "after",
          },
        ],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
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
      plugins: ["jest"],
      extends: ["plugin:jest/recommended"],
    },
  ],
  ignorePatterns: ["node_modules/", "dist/"],
};
