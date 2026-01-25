import React, { useCallback } from 'react';
import TestHarnessUI from './TestHarnessUI';
import { resetRenderCount, getRenderCount } from 'react-responsive-pagination/debug';
import {
  type FrameworkId,
  frameworkCssUrls,
  FrameworkIdContext,
} from './test-support/frameworkStyles';
import { PageFontsAndStyles } from './components/PageFontsAndStyles';

window.resetRenderCount = resetRenderCount;
window.getRenderCount = getRenderCount;

console.log(React.version);

export function TestHarnessApp() {
  const [activeFrameworkId, setActiveFrameworkId] = useFrameworkId('bootstrap4');
  const urlParams = new URLSearchParams(window.location.search);
  const notStrict = Boolean(urlParams.get('notStrict'));

  const testHarness = (
    <PageFontsAndStyles cssUrl={frameworkCssUrls[activeFrameworkId]}>
      <FrameworkIdContext.Provider value={activeFrameworkId}>
        <TestHarnessUI
          activeFrameworkId={activeFrameworkId}
          setActiveFrameworkId={setActiveFrameworkId}
        />
      </FrameworkIdContext.Provider>
    </PageFontsAndStyles>
  );

  return notStrict ? (
    testHarness
  ) : (
    <React.StrictMode>{testHarness}</React.StrictMode>
  );
}

function useFrameworkId(
  defaultFrameworkId: FrameworkId,
): [FrameworkId, (frameworkId: FrameworkId) => void] {
  const urlFrameworkId = window.location.pathname.replace(/^\//, '');

  const frameworkId =
    urlFrameworkId in frameworkCssUrls ? (urlFrameworkId as FrameworkId) : undefined;

  const setFrameworkId = useCallback((frameworkId: FrameworkId) => {
    window.location.href = frameworkId;
  }, []);

  return [frameworkId ?? defaultFrameworkId, setFrameworkId];
}
