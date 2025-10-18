import React from 'react';
import ReactDOM from 'react-dom';
import { TestHarnessApp } from 'test-harness-lib';

import 'test-harness-lib/index.css';

if (!React.version.startsWith('17.')) {
  throw new Error(`Unexpected React version: ${React.version}`);
}

ReactDOM.render(<TestHarnessApp />, document.getElementById('root'));
