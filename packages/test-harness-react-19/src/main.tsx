import React from 'react';
import { createRoot } from 'react-dom/client';
import { TestHarnessApp } from '../../test-harness-lib/src';

if (!React.version.startsWith('19.')) {
  throw new Error(`Unexpected React version: ${React.version}`);
}

const root = createRoot(document.getElementById('root')!);

root.render(<TestHarnessApp />);
