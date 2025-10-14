import React, { Suspense, useEffect, useState } from 'react';
import TestHarnessUI from './TestHarnessUI';
import { resetRenderCount, getRenderCount } from 'react-responsive-pagination/debug';

export function TestHarnessApp() {
  const urlParams = new URLSearchParams(window.location.search);
  const notStrict = Boolean(urlParams.get('notStrict'));

  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ready) {
      setup().then(() => setReady(true));
    }
  }, [ready]);

  const testHarness = (
    <Suspense fallback={null}>{ready && <TestHarnessUI />}</Suspense>
  );

  return notStrict ? (
    testHarness
  ) : (
    <React.StrictMode>{testHarness}</React.StrictMode>
  );
}

async function setup() {
  window.resetRenderCount = resetRenderCount;
  window.getRenderCount = getRenderCount;

  await windowLoadPromise();

  await document.fonts.load('16px Roboto');

  console.log(React.version);
}

function windowLoadPromise() {
  return new Promise<void>(resolve => {
    if (document.readyState === 'complete') {
      resolve();
    } else {
      window.addEventListener('load', () => resolve());
    }
  });
}
