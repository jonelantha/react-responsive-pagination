import { Component } from 'react';

export function createTestComponent(value: any) {
  switch (value) {
    case '<PreviousLabel />':
      return <PreviousLabel />;

    case '<NextLabel />':
      return <NextLabel />;

    case '<Anonymous />':
      return <div>Anonymous</div>;

    case '<AnonymousFragment />':
      return <>Anonymous</>;

    case '<TestClass />':
      return <TestClass />;
  }
}

function PreviousLabel() {
  return <div>Previous</div>;
}

function NextLabel() {
  return <div>Next</div>;
}

class TestClass extends Component {
  render() {
    return <div>Class</div>;
  }
}
