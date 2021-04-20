import React from 'react';

export function setRefValue<T>(ref: React.ForwardedRef<T>, value: T) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}
