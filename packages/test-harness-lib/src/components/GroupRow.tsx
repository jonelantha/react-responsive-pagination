import { useFrameworkId } from '../test-support/frameworkStyles';
import { FormRow } from './FormRow';

type GroupRowProps<T extends string> = {
  label: string;
  name: string;
  values: T[];
  input: (
    attrs: { value: T } & React.InputHTMLAttributes<HTMLInputElement>,
  ) => React.ReactNode;
};

export function GroupRow<T extends string>({
  label,
  name,
  values,
  input,
}: GroupRowProps<T>) {
  const styles = useStyles();

  return (
    <FormRow label={label} flexCell>
      {values.map(value => (
        <div className={styles.inputParent} key={value}>
          {input({ name, id: `${name}_${value}`, className: styles.input, value })}
          <label className={styles.label} htmlFor={`${name}_${value}`}>
            {value}
          </label>
        </div>
      ))}
    </FormRow>
  );
}

function useStyles() {
  const frameworkId = useFrameworkId();

  return frameworkId === 'tailwind'
    ? {
        inputParent: 'flex items-center gap-2',
        input: 'w-4 h-4',
        label: 'cursor-pointer',
      }
    : {
        inputParent: 'form-check form-check-inline align-middle',
        input: 'form-check-input',
        label: 'form-check-label',
      };
}
