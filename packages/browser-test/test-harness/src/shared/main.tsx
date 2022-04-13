import React, { ReactElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

export async function start(
  reactMount: (children: ReactElement, rootElement: Element) => void,
) {
  await windowLoadPromise();

  await document.fonts.load('16px Roboto');

  console.log(React.version);

  reactMount(
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>,
    document.getElementById('root')!,
  );
}

function windowLoadPromise() {
  return new Promise<void>(resolve => {
    if (document.readyState === 'complete') {
      resolve();
    } else {
      window.addEventListener('load', () => {
        resolve();
      });
    }
  });
}
