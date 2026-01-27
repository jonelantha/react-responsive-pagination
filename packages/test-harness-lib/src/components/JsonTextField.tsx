import { useField } from 'formik';
import { stringifyWithUndefined, tryJsonParse } from '../test-support/util';

type JsonTextFieldProps = { name: string } & React.HTMLAttributes<HTMLInputElement>;

export function JsonTextField({ name, ...rest }: JsonTextFieldProps) {
  const [_, meta, helpers] = useField(name);

  return (
    <input
      type="text"
      value={stringifyWithUndefined(meta.value)}
      onChange={e => helpers.setValue(tryJsonParse(e.target.value))}
      spellCheck={false}
      {...rest}
    />
  );
}
