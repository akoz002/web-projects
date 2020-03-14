/*
 * freeCodeCamp Front End Libraries Certification
 * Project 5: Pomodoro Clock
 * Alex Kozlov, 2020
 *
 * A countdown timer that alternates between session and break periods.
 * Rings a chime when each period completes. Can be paused and resumed, 
 * and the session and break durations can be changed.
 * Implemented in React in combination with Redux for state management.
 */

/*****************
 ***   Redux   ***
 *****************/

const { createStore } = Redux;

/*
 * Action types.
 */

const START_TIMER = 'START_TIMER';
const STOP_TIMER = 'STOP_TIMER';
const DECREMENT_CURRENT_TIME = 'DECREMENT_CURRENT_TIME';
const UPDATE_SESSION_TIME = 'UPDATE_SESSION_TIME';
const UPDATE_BREAK_TIME = 'UPDATE_BREAK_TIME';
const RESET_STATE = 'RESET_STATE';

/*
 * Action creators.
 */

/*
 * Start the timer.
 */

const startTimer = timerID => ({
  type: START_TIMER,
  timerID
});

/*
 * Stop the timer.
 */

const stopTimer = () => ({
  type: STOP_TIMER
});

/*
 * Decrement the current time by one second.
 */

const decrementCurrentTime = () => ({
  type: DECREMENT_CURRENT_TIME
});

/* 
 * Increment or decrement the session time.
 */

const updateSessionTime = incr => ({
  type: UPDATE_SESSION_TIME,
  incr
});

/* 
 * Increment or decrement the break time.
 */

const updateBreakTime = incr => ({
  type: UPDATE_BREAK_TIME,
  incr
});

/*
 * Reset to initial state.
 */

const resetState = () => ({
  type: RESET_STATE
});

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

/*
 * The Redux store.
 */

const reduxStore = createStore(rootReducer);

/*****************
 ***   React   ***
 *****************/

const { 
  render 
} = ReactDOM;

const { 
  connect,
  Provider
} = ReactRedux;

/*
 * Start/stop button for the timer.
 */

const StartStopButton = ({ 
  timerID,
  startTimer,
  stopTimer,
  decrementCurrentTime
}) => (
  <button id="start_stop" className="start-reset-buttons"
    onClick={() => {
      if (!timerID) {
        // start the timer
        const newTimerID = setInterval(decrementCurrentTime, 1000);
        startTimer(newTimerID);
      }
      else {
        // stop the timer
        clearInterval(timerID);
        stopTimer();
      }
    }}>
    { timerID ? <i className="fas fa-pause-circle" /> 
              : <i className="fas fa-play-circle" /> }
  </button>
);

/*
 * Connect start/stop button to the Redux store.
 */

const mapStateToStartStopProps = state => ({
  timerID: state.timerID
});

const mapDispatchToStartStopProps = dispatch => ({
  startTimer: timerID => dispatch(startTimer(timerID)),
  stopTimer: () => dispatch(stopTimer()),
  decrementCurrentTime: () => dispatch(decrementCurrentTime())
});
  
const StartStopButtonContainer = connect(
  mapStateToStartStopProps,
  mapDispatchToStartStopProps
)(StartStopButton);

/*
 * Reset button to reset to initial state.
 */

const ResetButton = ({ timerID, resetState }) => (
  <button id="reset" className="start-reset-buttons"
    onClick={() => {
      // stop playing audio
      const audio = document.getElementById('beep');
      audio.pause();
      audio.currentTime = 0;
      
      // clear the timer
      clearInterval(timerID);
      
      // reset the state
      resetState();
    }}>
    <i className="fas fa-sync-alt" />
  </button>
);

/*
 * Connect the Reset button to the Redux store.
 */

const mapStateToResetProps = state => ({
  timerID: state.timerID
});

const mapDispatchToResetProps = dispatch => ({
  resetState: () => dispatch(resetState())
});

const ResetButtonContainer = connect(
  mapStateToResetProps,
  mapDispatchToResetProps
)(ResetButton);

/*
 * Generic buttons to update duration.
 */

const DurationUpdateButtons = ({
  containerId,
  labelId,
  displayId,
  incrId,
  decrId,
  labelText,
  duration,
  updateDuration
}) => (
  <div id={containerId} className="update-container">
    <p id={labelId}>{labelText}</p>
    <button id={incrId} className="button"
      onClick={() => updateDuration(1)}>
      <i className="fas fa-caret-square-up" />
    </button>
    <p id={displayId}>{duration}</p>
    <button id={decrId} className="button"
      onClick={() => updateDuration(-1)}>
      <i className="fas fa-caret-square-down" />
    </button>
  </div>
);

/*
 * Session duration update buttons.
 */

const mapStateToSessionUpdateProps = state => ({
  duration: state.sessionTimeMins
});

const mapDispatchToSessionUpdateProps = dispatch => ({
  updateDuration: incr => dispatch(updateSessionTime(incr))
});

const SessionUpdateButtons = connect(
  mapStateToSessionUpdateProps,
  mapDispatchToSessionUpdateProps
)(DurationUpdateButtons);

/*
 * Break duration update buttons.
 */

const mapStateToBreakUpdateProps = state => ({
  duration: state.breakTimeMins
});

const mapDispatchToBreakUpdateProps = dispatch => ({
  updateDuration: incr => dispatch(updateBreakTime(incr))
});

const BreakUpdateButtons = connect(
  mapStateToBreakUpdateProps,
  mapDispatchToBreakUpdateProps
)(DurationUpdateButtons);

/*
 * Timer Display showing the current time.
 */

const TimerDisplay = ({ 
  currentTimeMins, 
  currentTimeSecs,
  isInSession
}) => {
  // play audio if count down is finished
  if (currentTimeMins === 0 && currentTimeSecs === 0) {
    const audio = document.getElementById('beep');
    audio.currentTime = 0;
    audio.play();
  }

  return (
    <div id="timer-display">
      <p id="timer-label">
        Currently in: { isInSession ? "Session" : "Break" }
      </p>
      <p id="time-left">
        { String(currentTimeMins).length < 2 ? 
          "0" + currentTimeMins : currentTimeMins }
        :
        { String(currentTimeSecs).length < 2 ? 
          "0" + currentTimeSecs : currentTimeSecs }
      </p>
      <audio id="beep" src="https://bitbucket.org/alexknz/public_files/raw/11cde81a03b910654cfe5c502744fa3c0bf36001/front_end_projects/bell.mp3" />
    </div>
  );
};

/*
 * Connect the Timer Display to the Redux store.
 */

const mapStateToTimerDisplayProps = state => ({
  currentTimeMins: state.currentTimeMins, 
  currentTimeSecs: state.currentTimeSecs,
  isInSession: state.isInSession
});
  
const TimerDisplayContainer = connect(
  mapStateToTimerDisplayProps
)(TimerDisplay);

/*
 * The main app.
 */

const App = () => (
  <div id="background">
    <main id="main">
      <SessionUpdateButtons 
        containerId="session-update-container"
        labelId="session-label"
        displayId="session-length"
        incrId="session-increment"
        decrId="session-decrement"
        labelText="Session Length" />
      <BreakUpdateButtons 
        containerId="break-update-container"
        labelId="break-label"
        displayId="break-length"
        incrId="break-increment"
        decrId="break-decrement"
        labelText="Break Length" />
      <TimerDisplayContainer />
      <div id="start-reset-button-container">
        <StartStopButtonContainer />
        <ResetButtonContainer />
      </div>
    </main>
  </div>
);

/*
 * Render the main app.
 */

render(
  <Provider store={reduxStore}>
    <App />
  </Provider>,
  document.querySelector('#root')
);