
import React from 'react';
import { connect } from 'react-redux';
import { resetState } from '../redux/actions';

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

const ConnectedResetButton = connect(
  state => ({
    timerID: state.timerID
  }),
  dispatch => ({
    resetState: () => dispatch(resetState())
  })
)(ResetButton);

export default ConnectedResetButton;
