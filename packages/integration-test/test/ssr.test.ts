import { test, describe, mock } from 'node:test';
import { equal } from 'node:assert';
import Pagination from 'react-responsive-pagination';
import { jsx } from 'react/jsx-runtime';
import { renderToString } from 'react-dom/server';

describe('ssr', () => {
  test('renders the narrowest nav invisibly', t => {
    const component = jsx(Pagination, {
      current: 1,
      total: 5,
      onPageChange: () => {},
    });

    const ssrComponent = renderToString(component);

    t.assert.snapshot(ssrComponent);
  });

  test('renders without console errors or warnings', () => {
    using mockConsole = makeMockConsole();

    const component = jsx(Pagination, {
      current: 1,
      total: 5,
      onPageChange: () => {},
    });

    renderToString(component);

    equal(mockConsole.error.mock.callCount(), 0);
    equal(mockConsole.warn.mock.callCount(), 0);
  });
});

function makeMockConsole() {
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;

  const mockConsoleError = mock.fn();
  const mockConsoleWarn = mock.fn();

  console.error = mockConsoleError;
  console.warn = mockConsoleWarn;

  return {
    error: mockConsoleError,
    warn: mockConsoleWarn,
    [Symbol.dispose]: () => {
      console.error = originalConsoleError;
      console.warn = originalConsoleWarn;
    },
  };
}
