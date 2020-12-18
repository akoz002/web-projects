
import React from 'react';
import { connect } from 'react-redux';
import bellAudio from '../audio/bell.mp3';

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
    const audio = document.getElementById('bell');
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
      <audio id="bell" src={bellAudio} />
    </div>
  );
};

/*
 * Connect the Timer Display to the Redux store.
 */

const ConnectedTimerDisplay = connect(
  state => ({
    currentTimeMins: state.currentTimeMins,
    currentTimeSecs: state.currentTimeSecs,
    isInSession: state.isInSession
  })
)(TimerDisplay);

export default ConnectedTimerDisplay;
