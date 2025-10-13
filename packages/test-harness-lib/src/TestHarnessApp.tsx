import React, { Suspense } from 'react';
import TestHarnessUI from './TestHarnessUI';

export default function TestHarnessApp() {
  const urlParams = new URLSearchParams(window.location.search);
  const notStrict = Boolean(urlParams.get('notStrict'));

  const testHarness = (
    <Suspense fallback={null}>
      <TestHarnessUI />
    </Suspense>
  );

  return notStrict ? (
    testHarness
  ) : (
    <React.StrictMode>{testHarness}</React.StrictMode>
  );
}
