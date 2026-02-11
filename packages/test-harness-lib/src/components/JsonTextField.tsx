import { useField } from 'formik';
import { stringifyWithUndefined, tryJsonParse } from '../test-support/util';
import { type HTMLAttributes, useCallback, useEffect, useState } from 'react';

type JsonTextFieldProps = { name: string } & HTMLAttributes<HTMLInputElement>;

export function JsonTextField({ name, ...rest }: JsonTextFieldProps) {
  const [_, { value: parentValue }, { setValue: setParentValue }] = useField(name);

  const [localValue, setLocalValue] = useState(stringifyWithUndefined(parentValue));

  // sync local value when parent value changes
  useEffect(() => {
    setLocalValue(stringifyWithUndefined(parentValue));
  }, [parentValue]);

  const resetToParentValue = useCallback(() => {
    setLocalValue(stringifyWithUndefined(parentValue));
  }, [parentValue]);

  const setValue = useCallback(
    (newValue: string) => {
      setLocalValue(newValue);

      const parsedValue = tryJsonParse(newValue);

      // does the parsed value convert back to the same string?
      if (stringifyWithUndefined(parsedValue) === newValue) {
        setParentValue(parsedValue);
      }
    },
    [setParentValue],
  );

  return (
    <input
      type="text"
      value={localValue}
      onChange={e => setValue(e.target.value)}
      onBlur={resetToParentValue}
      spellCheck={false}
      {...rest}
    />
  );
}
