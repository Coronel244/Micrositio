/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest/presets/js-with-ts",
  testEnvironment: "jsdom", // Configuración global para usar jsdom
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        isolatedModules: true,
      },
    ],
  },
  testMatch: ["**/tests/**/*.test.(ts|js)"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: ["utils.ts", "!**/node_modules/**", "!**/dist/**"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "<rootDir>/tests/mocks/styleMock.js",
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/tests/mocks/fileMock.js",
  },
}
