module.exports = {
  $schema: "node_modules/@stryker-mutator/core/schema/stryker-schema.json",
  packageManager: "npm",
  checkers: ["typescript"],
  reporters: ["html", "clear-text", "progress"],
  testRunner: "jest",
  coverageAnalysis: "perTest",
  jest: {
    configFile: "jest.config.ts",
  },
};
