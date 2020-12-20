
import React from 'react';
import { connect } from 'react-redux';
import UpdateButton from './UpdateButton';
import { updateSessionTime, updateBreakTime } from '../redux/actions';

/*
 * A generic container with two buttons to update a duration.
 */

const DurationUpdateButtons = ({
  containerId,
  displayId,
  labelText,
  shiftActivated,
  duration,
  updateDuration
}) => (
  <div id={containerId}>
    <p>{labelText}</p>
    <UpdateButton onClick={() => updateDuration(1)}
      faIcon="fas fa-caret-square-up"
      keyboardKey="ArrowUp"
      shiftActivated={shiftActivated} />
    <p id={displayId}>{duration}</p>
    <UpdateButton onClick={() => updateDuration(-1)}
      faIcon="fas fa-caret-square-down"
      keyboardKey="ArrowDown"
      shiftActivated={shiftActivated} />
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
