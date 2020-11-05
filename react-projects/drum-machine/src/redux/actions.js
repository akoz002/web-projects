
/*
 * Action types
 */

export const UPDATE_DRUM_PAD = 'UPDATE_DRUM_PAD';
export const TOGGLE_POWER = 'TOGGLE_POWER';
export const TOGGLE_BANK = 'TOGGLE_BANK';
export const UPDATE_VOLUME = 'UPDATE_VOLUME';

/*
 * Action creators
 */

export const updateDrumPad = drumPadName => ({
  type: UPDATE_DRUM_PAD,
  drumPadName
});

export const togglePower = () => ({
  type: TOGGLE_POWER
});

export const toggleBank = () => ({
  type: TOGGLE_BANK
});

export const updateVolume = volume => ({
  type: UPDATE_VOLUME,
  volume
});
