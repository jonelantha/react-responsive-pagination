import React, { ReactElement, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { resetRenderCount, getRenderCount } from 'react-responsive-pagination/debug';

import App from './App';

window.resetRenderCount = resetRenderCount;
window.getRenderCount = getRenderCount;

export async function start(
  reactMount: (children: ReactElement, rootElement: Element) => void,
) {
  await windowLoadPromise();

  await document.fonts.load('16px Roboto');

  console.log(React.version);

  const app = (
    <Suspense fallback={null}>
      <BrowserRouter>
        <Routes>
          <Route path=":frameworkId" element={<App />} />
          <Route index element={<Navigate to="/bootstrap4" replace />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );

  const urlParams = new URLSearchParams(window.location.search);
  const notStrict = Boolean(urlParams.get('notStrict'));

  reactMount(
    notStrict ? app : <React.StrictMode>{app}</React.StrictMode>,
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
