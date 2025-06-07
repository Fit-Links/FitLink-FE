module.exports = {
  root: true,
  extends: ["@5unwan/eslint-config/react-internal"],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
};
