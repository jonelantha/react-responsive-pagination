import { getThemeVariableTestValue } from '../test-support/framework-styles';

type TestThemeVariableSetterProps = {
  variable: string;
};

export function TestThemeVariableSetter({ variable }: TestThemeVariableSetterProps) {
  if (!variable) {
    return null;
  }

  return (
    <style>{`:root { ${variable}: ${getThemeVariableTestValue(variable)}; }`}</style>
  );
}
