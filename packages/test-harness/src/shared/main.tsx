import React, { ReactElement, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import App from './App';

export async function start(
  reactMount: (children: ReactElement, rootElement: Element) => void,
) {
  await windowLoadPromise();

  await document.fonts.load('16px Roboto');

  console.log(React.version);

  reactMount(
    <React.StrictMode>
      <Suspense fallback={null}>
        <Router>
          <Routes>
            <Route path="/:frameworkId" element={<App />} />
            <Route index element={<Navigate to="/bootstrap4" replace />} />
          </Routes>
        </Router>
      </Suspense>
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
