import type {Config} from 'jest';

const config: Config = {
  verbose: true,
  transform : {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testEnvironment: 'jsdom'
};

export default config;