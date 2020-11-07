
/*
 * Action types.
 */

export const START_TIMER = 'START_TIMER';
export const STOP_TIMER = 'STOP_TIMER';
export const DECREMENT_CURRENT_TIME = 'DECREMENT_CURRENT_TIME';
export const UPDATE_SESSION_TIME = 'UPDATE_SESSION_TIME';
export const UPDATE_BREAK_TIME = 'UPDATE_BREAK_TIME';
export const RESET_STATE = 'RESET_STATE';

/*
 * Action creators.
 */

/*
 * Start the timer.
 */

export const startTimer = timerID => ({
  type: START_TIMER,
  timerID
});

/*
 * Stop the timer.
 */

export const stopTimer = () => ({
  type: STOP_TIMER
});

/*
 * Decrement the current time by one second.
 */

export const decrementCurrentTime = () => ({
  type: DECREMENT_CURRENT_TIME
});

/*
 * Increment or decrement the session time.
 */

export const updateSessionTime = incr => ({
  type: UPDATE_SESSION_TIME,
  incr
});

/*
 * Increment or decrement the break time.
 */

export const updateBreakTime = incr => ({
  type: UPDATE_BREAK_TIME,
  incr
});

/*
 * Reset to initial state.
 */

export const resetState = () => ({
  type: RESET_STATE
});
