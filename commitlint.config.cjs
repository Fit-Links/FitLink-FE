module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "header-max-length": [2, "always", 150],
    "subject-case": [0],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "style", "refactor", "docs", "test", "ci", "chore", "rename", "merge"],
    ],
  },
  parserPreset: {
    parserOpts: {
      headerPattern: /^([A-Z]+-[0-9]+)\s(\w+):\s(.+)$/,
      headerCorrespondence: ["ticket", "type", "subject"],
    },
  },
  // Ignore automatic Changeset commits entirely
  ignores: [(commit) => commit.startsWith("chore: add changeset")],
};
