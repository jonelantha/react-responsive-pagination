import React from 'react';
import { resetRenderCount, getRenderCount } from 'react-responsive-pagination/debug';

window.resetRenderCount = resetRenderCount;
window.getRenderCount = getRenderCount;

export async function setup() {
  await windowLoadPromise();

  await document.fonts.load('16px Roboto');

  console.log(React.version);
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
