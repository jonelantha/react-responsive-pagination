import { ConsoleMessage, Page } from 'playwright';

export function setupThrowOnError(
  page: Page,
  options?: { ignoreInvalidPropTypes?: true },
) {
  page.on('pageerror', error => {
    console.error('pageerror', error);
    throw error;
  });

  page.on('console', async message => {
    const text = await getConsoleText(message);
    const type = message.type();

    if (options?.ignoreInvalidPropTypes && text.includes('Failed prop type')) {
      return;
    }

    if (type === 'error' || type === 'warn') {
      console.error(text);
      throw new Error(text);
    }
  });
}

async function getConsoleText(message: ConsoleMessage) {
  const args = await Promise.all(message.args().map(arg => arg.jsonValue()));

  let argCounter = 1;

  return message.text().replace(/%s/g, () => args[argCounter++]);
}

export function stringifyWithUndefined(value: any) {
  return value === undefined ? 'undefined' : JSON.stringify(value);
}
