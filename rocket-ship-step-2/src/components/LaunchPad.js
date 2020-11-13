import React, { useState } from 'react';
import { ClassRocket, FunctionalRocket } from './Rocket.js';
import '../styles/_launchpad.scss';

export default function LaunchPad() {
  // The idea is to remove the lines that are triggering a re-render
  const [rerenderCount, triggerRerender] = useState(0);

  setTimeout(() => { triggerRerender(rerenderCount + 1); }, 500);

  return (
    <div className="launchpad">
      <ClassRocket />
    </div>
  );
}
