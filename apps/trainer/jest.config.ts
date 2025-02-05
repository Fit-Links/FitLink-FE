import nextJest from "next/jest.js";

import type { Config } from "jest";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@trainer/(.*)$": "<rootDir>/$1",
    "^@ui/(.*)$": "<rootDir>/../../packages/ui/src/$1",
    "^test-utils$": "<rootDir>/utils/test/test-utils.tsx",
    "^lucide-react$": require.resolve("lucide-react"),
  },
};

export default createJestConfig(config);
