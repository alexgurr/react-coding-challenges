import React, { useState, Component } from 'react';
import RocketCore from './RocketCore';

export function FunctionalRocket() {
  const [initialLaunchTime] = useState(Date.now());

  return <RocketCore initialLaunchTime={initialLaunchTime} />;
}

// Answer 2: React.memo prevents re-render within a functional component
export const MemorisedFunctionalRocket = React.memo(FunctionalRocket);

export class ClassRocket extends Component {
  constructor() {
    super();

    this.state = {
      initialLaunchTime: Date.now()
    };
  }

  /**
   * Answer 1: 
   ShouldComponentUpdate will prevent the component from re-rendering.
   Extending the class with PureComponent instead also would prevent re-rendering.
   */

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { initialLaunchTime } = this.state;

    return <RocketCore initialLaunchTime={initialLaunchTime} />;
  }
}
