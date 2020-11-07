
import {
  START_TIMER,
  STOP_TIMER,
  DECREMENT_CURRENT_TIME,
  UPDATE_SESSION_TIME,
  UPDATE_BREAK_TIME,
  RESET_STATE
} from './actions';

/*
 * Reducers.
 */

const initialState = {
  sessionTimeMins: 25,
  breakTimeMins: 5,
  currentTimeMins: 25,
  currentTimeSecs: 0,
  isInSession: true, // is it session or break?
  timerID: null // if null, timer is not running
};

/*
 * Decrement the current time by one second.
 */

const decrementTimeReducer = (state, action) => {
  // if the timer isn't running
  if (!state.timerID) {
    return state;
  }

  // if current seconds are above zero
  if (state.currentTimeSecs > 0) {
    return Object.assign({}, state, {
      currentTimeSecs: state.currentTimeSecs - 1
    });
  }

  // if current minutes are above zero
  if (state.currentTimeMins > 0) {
    return Object.assign({}, state, {
      currentTimeSecs: 59,
      currentTimeMins: state.currentTimeMins - 1
    });
  }

  // the countdown has finished
  // begin the next countdown
  const newState = Object.assign({}, state, {
    isInSession: !state.isInSession,
    currentTimeMins: state.sessionTimeMins
  });

  if (!newState.isInSession) {
    newState.currentTimeMins = state.breakTimeMins;
  }

  return newState;
};

/*
 * Update session or break duration.
 */

const updateDurationReducer = (
  state, action, durationProp, updateCurrentTime
) => {
  // can't update if the timer is running
  if (state.timerID) {
    return state;
  }

  // constrain to range (1 - 60) inclusive
  const newDuration = state[durationProp] + action.incr;
  const newState = Object.assign({}, state, {
    [durationProp]: Math.max(Math.min(newDuration, 60), 1)
  });

  // do we also need to update the current time?
  if (updateCurrentTime) {
    newState.currentTimeMins = newState[durationProp];
    newState.currentTimeSecs = 0;
  }

  return newState;
};

/*
 * The root reducer.
 */

const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case START_TIMER:
      return Object.assign({}, state, {
        timerID: action.timerID
      });

    case STOP_TIMER:
      return Object.assign({}, state, {
        timerID: null
      });

    case UPDATE_SESSION_TIME:
      return updateDurationReducer(
        state, action, 'sessionTimeMins', state.isInSession
      );

    case UPDATE_BREAK_TIME:
      return updateDurationReducer(
        state, action, 'breakTimeMins', !state.isInSession
      );

    case DECREMENT_CURRENT_TIME:
      return decrementTimeReducer(state, action);

    case RESET_STATE:
      return Object.assign({}, initialState);

    default:
      return state;
  }
};

export default rootReducer;
