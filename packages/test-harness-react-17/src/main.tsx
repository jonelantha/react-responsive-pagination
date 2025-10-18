import React from 'react';
import ReactDOM from 'react-dom';
import { TestHarnessApp } from '../../test-harness-lib/src';

if (!React.version.startsWith('17.')) {
  throw new Error(`Unexpected React version: ${React.version}`);
}

ReactDOM.render(<TestHarnessApp />, document.getElementById('root'));
