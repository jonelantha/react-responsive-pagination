export {};

declare const url: string;

beforeAll(async () => {
  await page.goto(url);

  const totalInput = (await page.$('#totalJson'))!;
  await totalInput.fill('100');
});

// prettier-ignore
const testWidths = [
  1000, 900, 800, 700, 600, 500, 400, 300, 200, 100,
  250, 350, 450, 550, 650, 750, 850, 950,
];

describe.each(testWidths.map(width => [width]))('width (%i)', width => {
  it(`renders correctly at width ${width}px`, async () => {
    await page.setViewportSize({ width, height: 700 });

    await page.evaluate(() => new Promise(requestAnimationFrame));

    const paginationHtml = await page.$eval('ul.pagination', ul => ul.innerHTML);

    expect(paginationHtml).toMatchSnapshot();
  });
});
