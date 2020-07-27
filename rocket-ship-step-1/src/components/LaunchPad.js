import React, { useState } from 'react';
import { FunctionalRocket } from './Rocket.js';
import '../styles/_launchpad.scss';

export default function LaunchPad() {
  const [rerenderCount, triggerRerender] = useState(0);

  return (
    <div className="launchpad">
      <FunctionalRocket />
    </div>
  );
}
