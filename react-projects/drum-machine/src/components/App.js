
import React from 'react';
import { connect } from 'react-redux';
import { PowerSwitch, BankSwitch } from './Switch';
import VolumeSlider from './Slider';
import DrumGrid from './DrumGrid';

/*
 * The main Drum App.
 */

const App = ({ drumBanks, playedDrumPad, powerOn, bankIndex, volume }) => (
  <div>
    <header>
      <h1>Drum Machine App</h1>
      <p>
        Press keys or click on the buttons to play drum samples.
      </p>
      <p>
        Credit for drum samples goes to the awesome&nbsp;
        <a href="https://www.youtube.com/watch?v=IKIDbeTGkd0" target="_blank">
          metal drum samples pack
        </a>.
      </p>
    </header>
    <main>
      <PowerSwitch desc="Power"
        value={powerOn}
        stateDesc={powerOn ? "ON" : "OFF"} />
      <BankSwitch desc="Bank"
        value={bankIndex}
        stateDesc={drumBanks[bankIndex].bankName} />
      <VolumeSlider desc="Volume"
        value={volume}
        stateDesc={volume} />
      <DrumGrid drumBank={drumBanks[bankIndex].bankArray}
        playedDrumPad={playedDrumPad} />
    </main>
    <footer>
      <p>
        Implemented by Alex Kozlov for <a href="http://www.freecodecamp.org"
        target="_blank">freeCodeCamp</a>.
      </p>
    </footer>
  </div>
);

/*
 * The <App> that connects to the Redux store.
 * I decided to access the state values here and pass them to the
 * other components, together with descriptions which are derived
 * from the state values.
 */

const ConnectedApp = connect(
  state => ({
    playedDrumPad: state.playedDrumPad,
    powerOn: state.powerOn,
    bankIndex: state.bankIndex,
    volume: state.volume
  })
)(App);

export default ConnectedApp;
