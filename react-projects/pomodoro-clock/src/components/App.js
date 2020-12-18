
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
  <main>
    <SessionUpdateButtons
      containerId="session-update-container"
      displayId="session-length"
      labelText="Session Length" />
    <BreakUpdateButtons
      containerId="break-update-container"
      displayId="break-length"
      labelText="Break Length"
      altActivated={true} />
    <TimerDisplay />
    <div id="start-reset-button-container">
      <StartStopButton />
      <ResetButton />
    </div>
  </main>
);

export default App;
