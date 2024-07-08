module.exports = {
    testEnvironment: 'jsdom', // Sets the test environment to a browser-like environment
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Setup file for additional configuration
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest', // Transforms JavaScript and JSX files using Babel
    },
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mocks CSS imports
    },
    moduleFileExtensions: ['js', 'jsx'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  };
  