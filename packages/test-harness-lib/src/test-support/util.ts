import { useCallback, useState } from 'react';

function useUrlQueryValue(field: string): [string | null, (value: string) => void] {
  const [value, setValue] = useState<string | null>(() => {
    const params = new URLSearchParams(window.location.search);

    return params.get(field);
  });

  const setUrlValue = useCallback(
    (value: string) => {
      setValue(value);

      const params = new URLSearchParams(window.location.search);

      params.set(field, value);

      window.history.replaceState(
        {},
        '',
        `${window.location.pathname}?${params.toString()}`,
      );
    },
    [field],
  );

  return [value, setUrlValue];
}

export function useUrlQueryToggles(
  field: string,
  validValues: string[],
): [activeValues: string[], toggleValue: (value: string, toggle: boolean) => void] {
  const [urlParamValue, setUrlParamValue] = useUrlQueryValue(field);

  const activeValues =
    urlParamValue
      ?.split(',')
      .map(v => v.trim())
      .filter(v => validValues.includes(v)) || [];

  function toggleValue(value: string, toggle: boolean) {
    const newActiveValues = new Set(activeValues);
    if (toggle) {
      newActiveValues.add(value);
    } else {
      newActiveValues.delete(value);
    }

    setUrlParamValue([...newActiveValues].join(','));
  }

  return [activeValues, toggleValue];
}

export function tryJsonParse(str: string) {
  try {
    return JSON.parse(str);
  } catch {
    return undefined;
  }
}

export function stringifyWithUndefined(value: unknown) {
  return value === undefined ? 'undefined' : JSON.stringify(value);
}
