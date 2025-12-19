import { FormRow } from './FormRow';

type CheckboxGroupRowProps = {
  label: string;
  checkboxes: React.InputHTMLAttributes<HTMLInputElement>[];
};

export function CheckboxGroupRow({ label, checkboxes }: CheckboxGroupRowProps) {
  return (
    <FormRow label={label} cellCols={8}>
      {checkboxes.map(checkbox => (
        <div className="form-check form-check-inline align-middle" key={checkbox.id}>
          <input className="form-check-input" type="checkbox" {...checkbox} />
          <label className="form-check-label" htmlFor={checkbox.id}>
            {checkbox.value}
          </label>
        </div>
      ))}
    </FormRow>
  );
}
