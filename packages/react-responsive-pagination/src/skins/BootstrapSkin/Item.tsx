/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { MouseEventHandler } from 'react';

export default function Item({
  label,
  onClick: handleClick,
  isActive = false,
  a11yLabel,
  a11yHidden,
}: Props) {
  return (
    <li
      className={`page-item${getLiExtraClasses(isActive, !handleClick)}`}
      aria-hidden={a11yHidden}
    >
      {handleClick ? (
        <a
          className="page-link"
          href="#"
          onClick={handleClick}
          aria-label={a11yLabel}
        >
          {getContent(label, a11yLabel)}
        </a>
      ) : (
        <span className="page-link">{getContent(label, a11yLabel)}</span>
      )}
    </li>
  );
}

type Props = {
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  isActive?: Boolean;
  label: string;
  a11yLabel?: string;
  a11yHidden?: boolean;
};

function getLiExtraClasses(active: Boolean, disabled: Boolean) {
  return `${active ? ' active' : ''}${disabled ? ' disabled' : ''}`;
}

function getContent(label: string, a11yLabel?: string) {
  return a11yLabel ? (
    <>
      <span aria-hidden="true">{label}</span>
      <span className="sr-only">{a11yLabel}</span>
    </>
  ) : (
    label
  );
}
