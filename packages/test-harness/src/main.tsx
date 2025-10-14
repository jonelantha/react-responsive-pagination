import { createRoot } from 'react-dom/client';
// @ts-ignore
import { TestHarnessApp } from 'test-harness-lib';

import 'test-harness-lib/index.css';

const root = createRoot(document.getElementById('root')!);

root.render(<TestHarnessApp />);
