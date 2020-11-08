
import React from 'react';
import DrumPad from './DrumPad';

/*
 * A 3x3 grid of <DrumPad> components.
 */

const DrumGrid = ({ drumBank, playedDrumPad }) => (
  <section id="drum-grid-section">
    <div id="display">
      <p>{playedDrumPad}</p>
    </div>
    <div id="drum-grid">
      {drumBank.map(drumPad => (
        <DrumPad key={drumPad.key}
          keyboardKey={drumPad.key}
          name={drumPad.name}
          audioFile={drumPad.audioFile} />
      ))}
    </div>
  </section>
);

export default DrumGrid;
