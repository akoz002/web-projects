
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
  * Create the drum bank arrays and render the Drum App.
  */

 const drumBankOneArray = [
   {
     key: 'Q',
     name: 'Closed Hat',
     audioFile: 'https://bitbucket.org/alexknz/public_files/raw/f4c1e9527df5fff9c74a59a273c86c118154b815/front_end_projects/drum_machine/metal_drum_kit_1/1_closed_hat.wav'
   },
   {
     key: 'W',
     name: 'Ride Cymbal',
     audioFile: 'https://bitbucket.org/alexknz/public_files/raw/f4c1e9527df5fff9c74a59a273c86c118154b815/front_end_projects/drum_machine/metal_drum_kit_1/2_ride_cymbal.wav'
   },
   {
     key: 'E',
     name: 'Rack Tom 1',
     audioFile: 'https://bitbucket.org/alexknz/public_files/raw/f4c1e9527df5fff9c74a59a273c86c118154b815/front_end_projects/drum_machine/metal_drum_kit_1/3_rack_tom_1.wav'
   },
   {
     key: 'A',
     name: 'Rack Tom 2',
     audioFile: 'https://bitbucket.org/alexknz/public_files/raw/f4c1e9527df5fff9c74a59a273c86c118154b815/front_end_projects/drum_machine/metal_drum_kit_1/4_rack_tom_2.wav'
   },
   {
     key: 'S',
     name: 'Rack Tom 3',
     audioFile: 'https://bitbucket.org/alexknz/public_files/raw/f4c1e9527df5fff9c74a59a273c86c118154b815/front_end_projects/drum_machine/metal_drum_kit_1/5_rack_tom_3.wav'
   },
   {
     key: 'D',
     name: 'Snare',
     audioFile: 'https://bitbucket.org/alexknz/public_files/raw/f4c1e9527df5fff9c74a59a273c86c118154b815/front_end_projects/drum_machine/metal_drum_kit_1/6_snare.wav'
   },
   {
     key: 'Z',
     name: 'Floor Tom 1',
     audioFile: 'https://bitbucket.org/alexknz/public_files/raw/f4c1e9527df5fff9c74a59a273c86c118154b815/front_end_projects/drum_machine/metal_drum_kit_1/7_floor_tom_1.wav'
   },
   {
     key: 'X',
     name: 'Floor Tom 2',
     audioFile: 'https://bitbucket.org/alexknz/public_files/raw/f4c1e9527df5fff9c74a59a273c86c118154b815/front_end_projects/drum_machine/metal_drum_kit_1/8_floor_tom_2.wav'
   },
   {
     key: 'C',
     name: 'Bass',
     audioFile: 'https://bitbucket.org/alexknz/public_files/raw/f4c1e9527df5fff9c74a59a273c86c118154b815/front_end_projects/drum_machine/metal_drum_kit_1/9_bass.wav'
   }
 ];

 const drumBankTwoArray = [
   {
     key: 'Q',
     name: 'Splash Cymbal',
     audioFile: 'https://bitbucket.org/alexknz/public_files/raw/f4c1e9527df5fff9c74a59a273c86c118154b815/front_end_projects/drum_machine/metal_drum_kit_2/1_splash_cymbal.wav'
   },
   {
     key: 'W',
     name: 'Crash Cymbal',
     audioFile: 'https://bitbucket.org/alexknz/public_files/raw/f4c1e9527df5fff9c74a59a273c86c118154b815/front_end_projects/drum_machine/metal_drum_kit_2/2_crash_cymbal.wav'
   },
   {
     key: 'E',
     name: 'Rack Tom 1',
     audioFile: 'https://bitbucket.org/alexknz/public_files/raw/f4c1e9527df5fff9c74a59a273c86c118154b815/front_end_projects/drum_machine/metal_drum_kit_2/3_rack_tom_1.wav'
   },
   {
     key: 'A',
     name: 'Rack Tom 2',
     audioFile: 'https://bitbucket.org/alexknz/public_files/raw/f4c1e9527df5fff9c74a59a273c86c118154b815/front_end_projects/drum_machine/metal_drum_kit_2/4_rack_tom_2.wav'
   },
   {
     key: 'S',
     name: 'Rack Tom 3',
     audioFile: 'https://bitbucket.org/alexknz/public_files/raw/f4c1e9527df5fff9c74a59a273c86c118154b815/front_end_projects/drum_machine/metal_drum_kit_2/5_rack_tom_3.wav'
   },
   {
     key: 'D',
     name: 'Snare',
     audioFile: 'https://bitbucket.org/alexknz/public_files/raw/f4c1e9527df5fff9c74a59a273c86c118154b815/front_end_projects/drum_machine/metal_drum_kit_2/6_snare.wav'
   },
   {
     key: 'Z',
     name: 'Floor Tom 1',
     audioFile: 'https://bitbucket.org/alexknz/public_files/raw/f4c1e9527df5fff9c74a59a273c86c118154b815/front_end_projects/drum_machine/metal_drum_kit_2/7_floor_tom_1.wav'
   },
   {
     key: 'X',
     name: 'Floor Tom 2',
     audioFile: 'https://bitbucket.org/alexknz/public_files/raw/f4c1e9527df5fff9c74a59a273c86c118154b815/front_end_projects/drum_machine/metal_drum_kit_2/8_floor_tom_2.wav'
   },
   {
     key: 'C',
     name: 'Bass',
     audioFile: 'https://bitbucket.org/alexknz/public_files/raw/f4c1e9527df5fff9c74a59a273c86c118154b815/front_end_projects/drum_machine/metal_drum_kit_2/9_bass.wav'
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
