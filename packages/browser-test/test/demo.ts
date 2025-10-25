import { test } from '@playwright/test';
import { TestHarnessPage } from './test-harness-page.ts';

const startWidth = 650;
const endWidth = 500;
const rate = 1;

test('demo', async ({ page }) => {
  test.setTimeout(100_000);

  const testHarness = new TestHarnessPage(page, { throwOnError: true });

  await testHarness.goto({ framework: 'bootstrapLightDarkTheme', css: 'demo' });

  await page.setViewportSize({ width: startWidth, height: 200 });

  await testHarness.setField('current', 8);

  await testHarness.setField('total', 20);

  await page.evaluate(() => {
    document.documentElement.scrollTop = 0;
  });

  await page.waitForTimeout(5000);

  for (const colorScheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme });

    await page.waitForTimeout(15000);

    for (let i = 0; i <= 100; i += rate) {
      const r = i / 100;
      const width = Math.floor(startWidth - (startWidth - endWidth) * linear(r));
      await page.setViewportSize({ width, height: 200 });
      await page.waitForTimeout(10);
    }

    await page.waitForTimeout(1000);

    for (let i = 0; i <= 100; i += rate) {
      const r = i / 100;
      const width = Math.floor(endWidth + (startWidth - endWidth) * linear(r));
      await page.setViewportSize({ width, height: 200 });
      await page.waitForTimeout(10);
    }

    await page.waitForTimeout(5000);
  }
});

//http://npmjs.com/package/react-responsive-pagination?activeTab=readme

function linear(x: number) {
  return x;
}

// function easeOutSine(x: number) {
//   return Math.sin((x * Math.PI) / 2);
// }

// function easeOutQuad(x: number) {
//   return 1 - (1 - x) * (1 - x);
// }

// function easeOutCubic(x: number) {
//   return 1 - Math.pow(1 - x, 3);
// }
