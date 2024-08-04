import Pagination from './index.js';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

describe('ssr', () => {
  test('renders the narrowest nav invisibly', () => {
    const component = <Pagination current={1} total={5} onPageChange={() => {}} />;

    const ssrComponent = ReactDOMServer.renderToString(component);

    expect(ssrComponent).toMatchSnapshot();
  });

  test('renders without console errors or warnings', () => {
    const mockConsoleError = jest.spyOn(console, 'error');
    const mockConsoleWarn = jest.spyOn(console, 'warn');

    try {
      const component = <Pagination current={1} total={5} onPageChange={() => {}} />;

      ReactDOMServer.renderToString(component);

      expect(mockConsoleError).not.toHaveBeenCalled();
      expect(mockConsoleWarn).not.toHaveBeenCalled();
    } finally {
      mockConsoleError.mockRestore();
      mockConsoleWarn.mockRestore();
    }
  });
});
