/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      { tsconfig: './tsconfig.jest.json' },
    ],
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./src/jest.setup.ts'],
  modulePathIgnorePatterns: ['./dist', './out', './cypress'],
  moduleDirectories: ['node_modules', 'src'],
};
