import React, { isValidElement, ReactNode } from 'react';
import { fontWeightBold } from './GlobalStyles';
import styled from 'styled-components';

export function PropsTable({ children }: { children: ReactNode }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Prop</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

const PropName = styled.span`
  font-weight: ${fontWeightBold};
`;

export function PropDef({ name, type, defaultValue, children }: PropDefProps) {
  return (
    <tr>
      <td>
        <PropName>{name}</PropName>
        <br />
        <em>{formatDefault(defaultValue)}</em>
      </td>
      <td>
        <code title="type">{type}</code>
        <br />
        {formatDescription(children)}
      </td>
    </tr>
  );
}

type PropDefProps = {
  name: string;
  type: string;
  defaultValue?: string;
  children: ReactNode;
};

function formatDescription(children: ReactNode) {
  if (isValidElement(children)) {
    return children.props.children;
  } else if (Array.isArray(children)) {
    let description: ReactNode[] = [];

    React.Children.forEach(children, (child, index) => {
      index > 0 && description.push(<br key={`br_${index}`} />);

      description.push(isValidElement(child) ? child.props.children : child);
    });

    return description;
  } else {
    return children;
  }
}

function formatDefault(defaultValue: string | undefined) {
  if (defaultValue === 'undefined') {
    return '(optional)';
  } else if (defaultValue) {
    return `(optional - default ${defaultValue})`;
  } else {
    return '(required)';
  }
}
