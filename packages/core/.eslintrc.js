module.exports = {
  root: true,
  extends: ["@5unwan/eslint-config/base"],
  env: {
    node: true,
  },
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  overrides: [
    {
      files: ["*.js", "*.cjs", "*.mjs"],
      parserOptions: {
        project: null,
      },
    },
  ],
};
