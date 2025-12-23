import { Field } from 'formik';

type FieldSelectProps = {
  options: string[];
  name: string;
} & React.HTMLAttributes<HTMLSelectElement>;

export function FieldSelect({ options, ...rest }: FieldSelectProps) {
  return (
    <Field as="select" {...rest}>
      <option value="">Select</option>
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Field>
  );
}
