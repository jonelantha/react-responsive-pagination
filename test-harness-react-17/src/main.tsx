import ReactDOM from 'react-dom';
// @ts-ignore
import { setup } from 'test-harness-lib';
// @ts-ignore
import TestHarnessApp from 'test-harness-lib/TestHarnessApp';

import 'test-harness-lib/index.css';

await setup();

ReactDOM.render(<TestHarnessApp />, document.getElementById('root'));
