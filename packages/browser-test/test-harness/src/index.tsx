import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

async function run() {
  await windowLoadPromise();

  await document.fonts.load('16px Roboto');

  ReactDOM.render(
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>,
    document.getElementById('root'),
  );
}

run();

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
