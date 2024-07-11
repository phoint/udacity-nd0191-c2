// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import 'whatwg-fetch';

beforeEach(() => {
    // Mock the location to a default state before each test
    delete window.location;
    window.location = new URL('http://localhost:8080');
  });