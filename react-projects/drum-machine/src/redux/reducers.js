
import { combineReducers } from 'redux';
import {
  UPDATE_DRUM_PAD,
  TOGGLE_POWER,
  TOGGLE_BANK,
  UPDATE_VOLUME
} from './actions';

/*
 * Reducers
 */

/*
 * String name of the last played drum pad.
 */

const playedDrumPad = (state = '', action) => {
  switch(action.type) {
    case UPDATE_DRUM_PAD:
      return action.drumPadName;
    default:
      return state;
  }
}

/*
 * Toggles the power on state (0 or 1).
 */

const powerOn = (state = 1, action) => {
  switch(action.type) {
    case TOGGLE_POWER:
      return Number(!state);
    default:
      return state;
  }
}

/*
 * Toggles the drum sample bank index (0 or 1).
 */

const bankIndex = (state = 0, action) => {
  switch(action.type) {
    case TOGGLE_BANK:
      return Number(!state);
    default:
      return state;
  }
}

/*
 * Sets the volume for playing the audio samples.
 */

const volume = (state = 50, action) => {
  switch(action.type) {
    case UPDATE_VOLUME:
      return action.volume;
    default:
      return state;
  }
}

/*
 * Export the root reducer.
 */

const rootReducer = combineReducers({
  playedDrumPad,
  powerOn,
  bankIndex,
  volume
});

export default rootReducer;
