import React, { useState, useCallback, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';

export default function Reveal<T extends HTMLElement>({
  children: render,
  open,
}: RevealProps<T>) {
  const ref = useRef<T>(null);

  const [animationType, setAnimationType] = useState<'open' | 'close'>(
    open ? 'open' : 'close',
  );
  const [phase, setPhase] = useState<
    { type: 'animate-from' | 'animate-to'; height: number } | { type: 'complete' }
  >({ type: 'complete' });

  useEffect(() => {
    // open prop changed, start new animation
    if (open && animationType === 'close') {
      setAnimationType('open');
      setPhase({ type: 'animate-from', height: 0 });
    } else if (!open && animationType === 'open') {
      setAnimationType('close');
      setPhase(
        ref.current?.scrollHeight
          ? { type: 'animate-from', height: ref.current.scrollHeight }
          : { type: 'complete' },
      );
    }
  }, [open, animationType]);

  useEffect(() => {
    if (phase.type === 'animate-from') {
      // when animate-from has just been rendered
      // accessing scrollHeight for all cases forces reflow
      // necessary for animation-from state to be committed
      const elementScrollHeight = ref.current?.scrollHeight;

      if (animationType === 'open') {
        setPhase(
          elementScrollHeight
            ? { type: 'animate-to', height: elementScrollHeight }
            : { type: 'complete' },
        );
      } else {
        setPhase({ type: 'animate-to', height: 0 });
      }
    }
  }, [animationType, phase.type]);

  const onTransitionEnd = useCallback(() => {
    setPhase({ type: 'complete' });
  }, []);

  return (
    <RevealContainer
      animateHeight={phase.type === 'complete' ? undefined : phase.height}
      displayNone={phase.type === 'complete' && animationType === 'close'}
      render={className => render({ className, ref, onTransitionEnd })}
    />
  );
}

type RevealProps<T> = {
  children: RenderFn<T>;
  open: boolean;
};

type RenderFn<T> = (props: {
  onTransitionEnd: (e: React.TransitionEvent) => void;
  className?: string;
  ref: React.Ref<T>;
}) => JSX.Element;

const RevealContainer = styled(RevealChild)<{
  animateHeight: number | undefined;
  displayNone: boolean;
}>`
  will-change: height;

  ${({ displayNone }) => displayNone && 'display: none;'}

  ${({ animateHeight }) =>
    animateHeight !== undefined &&
    css`
      transition: height 350ms ease-in-out;
      height: ${animateHeight}px;
      overflow: hidden;
    `}}
`;

function RevealChild({ render, className }: RevealChildProps) {
  return render(className);
}

type RevealChildProps = {
  render: (className?: string) => JSX.Element;
  className?: string;
};
