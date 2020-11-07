
import React from 'react';
import {
  SessionUpdateButtons,
  BreakUpdateButtons
} from './DurationUpdateButtons';
import TimerDisplay from './TimerDisplay';
import StartStopButton from './StartStopButton';
import ResetButton from './ResetButton';

/*
 * The main app.
 */

const App = () => (
  <div id="background">
    <main id="main">
      <SessionUpdateButtons
        containerId="session-update-container"
        labelId="session-label"
        displayId="session-length"
        incrId="session-increment"
        decrId="session-decrement"
        labelText="Session Length" />
      <BreakUpdateButtons
        containerId="break-update-container"
        labelId="break-label"
        displayId="break-length"
        incrId="break-increment"
        decrId="break-decrement"
        labelText="Break Length" />
      <TimerDisplay />
      <div id="start-reset-button-container">
        <StartStopButton />
        <ResetButton />
      </div>
    </main>
  </div>
);

export default App;
