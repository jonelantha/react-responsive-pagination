import React, { isValidElement, ReactNode } from 'react';
import { fontWeightBold } from './GlobalStyles';
import styled from 'styled-components';

const PropsTableStyles = styled.table`
  table-layout: fixed;
  width: 100%;
`;

const PropColumnStyles = styled.col`
  width: 13rem;
`;

export function PropsTable({ children }: { children: ReactNode }) {
  return (
    <PropsTableStyles>
      <colgroup>
        <PropColumnStyles />
      </colgroup>
      <thead>
        <tr>
          <th>Prop</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </PropsTableStyles>
  );
}

const PropName = styled.div`
  font-weight: ${fontWeightBold};
`;

export function PropDef({ name, type, defaultValue, children }: PropDefProps) {
  return (
    <tr>
      <td>
        <PropName>{name}</PropName>
        <code>{type}</code>
        <br />
        <em>{defaultValue ? '(optional)' : '(required)'}</em>
      </td>
      <td>{children}</td>
    </tr>
  );
}

type PropDefProps = {
  name: string;
  type: string;
  defaultValue?: string;
  children: ReactNode;
};
