
import React from 'react';
import { connect } from 'react-redux';
import { PowerSwitch, BankSwitch } from './Switch';
import VolumeSlider from './Slider';
import DrumGrid from './DrumGrid';

/*
 * The main Drum App.
 */

const App = ({ drumBanks, playedDrumPad, powerOn, bankIndex, volume }) => (
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
