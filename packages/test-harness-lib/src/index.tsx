import React, { useCallback } from 'react';
import TestHarnessUI from './TestHarnessUI';
import { resetRenderCount, getRenderCount } from 'react-responsive-pagination/debug';
import type { FrameworkId } from './frameworkStyles';
import { frameworkCssUrls } from './frameworkStyles';
import { PageFontsAndStyles } from './PageFontsAndStyles';

import './TestStyles.css';
import './TestHarness.css';

window.resetRenderCount = resetRenderCount;
window.getRenderCount = getRenderCount;

console.log(React.version);

export function TestHarnessApp() {
  const [activeFrameworkId, setActiveFrameworkId] = useFrameworkId('bootstrap4');
  const urlParams = new URLSearchParams(window.location.search);
  const notStrict = Boolean(urlParams.get('notStrict'));

  const testHarness = (
    <PageFontsAndStyles cssUrl={frameworkCssUrls[activeFrameworkId]}>
      <TestHarnessUI
        activeFrameworkId={activeFrameworkId}
        setActiveFrameworkId={setActiveFrameworkId}
      />
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
