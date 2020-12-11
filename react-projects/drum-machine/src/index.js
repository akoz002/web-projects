
/*
 * freeCodeCamp Front End Libraries Certification
 * Project 3: Drum Machine
 * Alex Kozlov, 2020
 *
 * Plays audio drum samples when keys are pressed or the buttons are clicked.
 * Has two drum sample banks that can be switched between, as well as a power
 * switch and a volume slider.
 *
 * Implemented in React in combination with Redux for state management. Although
 * using Redux isn't really necessary for a small app like this, I primarily wanted
 * to do it as an exercise to get a better understanding of Redux and its applicability.
 */

import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App';
import rootReducer from './redux/reducers';

/*
 * Import audio files.
 */

import kit1ClosedHat from './audio/kit_1/1_closed_hat.wav';
import kit1RideCymbal from './audio/kit_1/2_ride_cymbal.wav';
import kit1RackTom1 from './audio/kit_1/3_rack_tom_1.wav';
import kit1RackTom2 from './audio/kit_1/4_rack_tom_2.wav';
import kit1RackTom3 from './audio/kit_1/5_rack_tom_3.wav';
import kit1Snare from './audio/kit_1/6_snare.wav';
import kit1FloorTom1 from './audio/kit_1/7_floor_tom_1.wav';
import kit1FloorTom2 from './audio/kit_1/8_floor_tom_2.wav';
import kit1Bass from './audio/kit_1/9_bass.wav';

import kit2SplashCymbal from './audio/kit_2/1_splash_cymbal.wav';
import kit2CrashCymbal from './audio/kit_2/2_crash_cymbal.wav';
import kit2RackTom1 from './audio/kit_2/3_rack_tom_1.wav';
import kit2RackTom2 from './audio/kit_2/4_rack_tom_2.wav';
import kit2RackTom3 from './audio/kit_2/5_rack_tom_3.wav';
import kit2Snare from './audio/kit_2/6_snare.wav';
import kit2FloorTom1 from './audio/kit_2/7_floor_tom_1.wav';
import kit2FloorTom2 from './audio/kit_2/8_floor_tom_2.wav';
import kit2Bass from './audio/kit_2/9_bass.wav';

/*
 * Create the drum bank arrays and render the Drum App.
 */

const drumBankOneArray = [
  {
    key: 'Q',
    name: 'Closed Hat',
    audioFile: kit1ClosedHat
  },
  {
    key: 'W',
    name: 'Ride Cymbal',
    audioFile: kit1RideCymbal
  },
  {
    key: 'E',
    name: 'Rack Tom 1',
    audioFile: kit1RackTom1
  },
  {
    key: 'A',
    name: 'Rack Tom 2',
    audioFile: kit1RackTom2
  },
  {
    key: 'S',
    name: 'Rack Tom 3',
    audioFile: kit1RackTom3
  },
  {
    key: 'D',
    name: 'Snare',
    audioFile: kit1Snare
  },
  {
    key: 'Z',
    name: 'Floor Tom 1',
    audioFile: kit1FloorTom1
  },
  {
    key: 'X',
    name: 'Floor Tom 2',
    audioFile: kit1FloorTom2
  },
  {
    key: 'C',
    name: 'Bass',
    audioFile: kit1Bass
  }
];

const drumBankTwoArray = [
  {
    key: 'Q',
    name: 'Splash Cymbal',
    audioFile: kit2SplashCymbal
  },
  {
    key: 'W',
    name: 'Crash Cymbal',
    audioFile: kit2CrashCymbal
  },
  {
    key: 'E',
    name: 'Rack Tom 1',
    audioFile: kit2RackTom1
  },
  {
    key: 'A',
    name: 'Rack Tom 2',
    audioFile: kit2RackTom2
  },
  {
    key: 'S',
    name: 'Rack Tom 3',
    audioFile: kit2RackTom3
  },
  {
    key: 'D',
    name: 'Snare',
    audioFile: kit2Snare
  },
  {
    key: 'Z',
    name: 'Floor Tom 1',
    audioFile: kit2FloorTom1
  },
  {
    key: 'X',
    name: 'Floor Tom 2',
    audioFile: kit2FloorTom2
  },
  {
    key: 'C',
    name: 'Bass',
    audioFile: kit2Bass
  }
];

const drumBanks = [
  {
    bankName: "Metal Drum Kit 1",
    bankArray: drumBankOneArray
  },
  {
    bankName: "Metal Drum Kit 2",
    bankArray: drumBankTwoArray
  }
];

const store = createStore(rootReducer);

render(
  <Provider store={store}>
    <App drumBanks={drumBanks} />
  </Provider>,
  document.getElementById('root')
);
