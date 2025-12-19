import { FormRow } from './FormRow';

type RadioGroupRowProps = {
  label: string;
  radios: React.InputHTMLAttributes<HTMLInputElement>[];
};

export function RadioGroupRow({ label, radios }: RadioGroupRowProps) {
  return (
    <FormRow label={label} cellCols={8}>
      {radios.map(radio => (
        <div className="form-check form-check-inline align-middle" key={radio.id}>
          <input type="radio" className="form-check-input" {...radio} />
          <label className="form-check-label" htmlFor={radio.id}>
            {radio.value}
          </label>
        </div>
      ))}
    </FormRow>
  );
}
