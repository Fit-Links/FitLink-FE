/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleDirectories: ["node_modules", "lib/test", __dirname],
  moduleNameMapper: {
    "^@ui/(.*)$": "<rootDir>/src/$1",
    "^lucide-react$": require.resolve("lucide-react"),
  },
};
