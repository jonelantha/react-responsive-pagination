import { createRoot } from 'react-dom/client';
// @ts-ignore
import { setup } from 'test-harness-lib';
// @ts-ignore
import TestHarnessApp from 'test-harness-lib/TestHarnessApp';

import 'test-harness-lib/index.css';

await setup();

const root = createRoot(document.getElementById('root')!);

root.render(<TestHarnessApp />);
