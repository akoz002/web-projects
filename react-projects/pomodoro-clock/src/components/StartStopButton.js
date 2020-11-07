
import React from 'react';
import { connect } from 'react-redux';
import {
  startTimer,
  stopTimer,
  decrementCurrentTime
} from '../redux/actions';

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

const ConnectedStartStopButton = connect(
  state => ({
    timerID: state.timerID
  }),
  dispatch => ({
    startTimer: timerID => dispatch(startTimer(timerID)),
    stopTimer: () => dispatch(stopTimer()),
    decrementCurrentTime: () => dispatch(decrementCurrentTime())
  })
)(StartStopButton);

export default ConnectedStartStopButton;
