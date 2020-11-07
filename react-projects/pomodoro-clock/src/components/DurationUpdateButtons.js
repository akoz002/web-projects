
import React from 'react';
import { connect } from 'react-redux';
import { updateSessionTime, updateBreakTime } from '../redux/actions';

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

export const SessionUpdateButtons = connect(
  state => ({
    duration: state.sessionTimeMins
  }),
  dispatch => ({
    updateDuration: incr => dispatch(updateSessionTime(incr))
  })
)(DurationUpdateButtons);

/*
 * Break duration update buttons.
 */

export const BreakUpdateButtons = connect(
  state => ({
    duration: state.breakTimeMins
  }),
  dispatch => ({
    updateDuration: incr => dispatch(updateBreakTime(incr))
  })
)(DurationUpdateButtons);
