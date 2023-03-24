const config = {
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        isolatedModules: true,
      },
    ],
  },
  displayName: "@devo/vizco-holo",
  testMatch: ["<rootDir>/src/**/*.test.ts"],
};

export default config;
