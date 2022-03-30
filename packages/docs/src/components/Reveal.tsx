import React, { useState, useCallback, useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';

type State = 'open' | 'close';
type Phase = 'start-pos' | 'animate' | 'complete';

export default function Reveal<T extends HTMLElement>({
  children: render,
  expanded,
}: RevealProps<T>) {
  const ref = useRef<T>(null);

  const [state, setState] = useState<State>(expanded ? 'open' : 'close');
  const [phase, setPhase] = useState<Phase>('complete');

  useLayoutEffect(() => {
    if (expanded && state === 'close') {
      setState('open');
      setPhase('start-pos');
    } else if (!expanded && state === 'open') {
      setState('close');
      setPhase('start-pos');
    }

    if (phase === 'start-pos') {
      setPhase('animate');
    }
  }, [expanded, state, phase]);

  const onTransitionEnd = useCallback(() => {
    setPhase('complete');
  }, []);

  return (
    <RevealContainer
      state={state}
      phase={phase}
      elementScrollHeight={ref.current?.scrollHeight}
      render={className => render({ className, ref, onTransitionEnd })}
    />
  );
}

type RevealProps<T> = {
  children: RenderFn<T>;
  expanded: boolean;
};

type RenderFn<T> = (props: {
  onTransitionEnd: (e: React.TransitionEvent) => void;
  className?: string;
  ref: React.Ref<T>;
}) => JSX.Element;

const RevealContainer = styled(RevealChild)<{
  state: State;
  phase: Phase;
  elementScrollHeight: number | undefined;
}>`
  will-change: height;

  ${({ state, phase, elementScrollHeight }) =>
    ({
      'open-start-pos': `
          height: 0;
          overflow: hidden;
        `,
      'open-animate': `
          transition: height 350ms ease-in-out;
          height: ${elementScrollHeight}px;
          overflow: hidden;
        `,
      'open-complete': undefined,
      'close-start-pos': `
          height: ${elementScrollHeight}px;
          overflow: hidden;
        `,
      'close-animate': `
          transition: height 350ms ease-in-out;
          height: 0;
          overflow: hidden;
        `,
      'close-complete': 'display: none',
    }[`${state}-${phase}`])}
`;

function RevealChild({ render, className }: RevealChildProps) {
  return render(className);
}

type RevealChildProps = {
  render: (className?: string) => JSX.Element;
  className?: string;
};
