import React from 'react';
import { createRoot } from 'react-dom/client';
import { TestHarnessApp } from 'test-harness-lib';

import 'test-harness-lib/index.css';

if (!React.version.startsWith('18.')) {
  throw new Error(`Unexpected React version: ${React.version}`);
}

const root = createRoot(document.getElementById('root')!);

root.render(<TestHarnessApp />);
