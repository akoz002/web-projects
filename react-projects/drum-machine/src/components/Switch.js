
import React from 'react';
import { connect } from 'react-redux';
import { togglePower, toggleBank } from '../redux/actions';

/*
 * A generic Switch input which has two values (0 or 1).
 * Toggled with a mouse down press.
 */

const Switch = ({ desc, stateDesc, value, handleChange }) => (
  <div className="switch">
    <p>{desc}:
      <span className="state-desc">{' ' + stateDesc}</span>
    </p>
    <input type="range" min="0" max="1" className="range-input"
      value={value}
      onChange={handleChange} />
  </div>
);

/*
 * Power switch that toggles the power state.
 * We could access the "powerOn" state here as well,
 * but I decided to pass it from the main App together
 * with the state description.
 */

export const PowerSwitch = connect(
  null,
  dispatch => ({
    handleChange: () => dispatch(togglePower())
  })
)(Switch);

/*
 * Bank switch that toggles the audio sample bank.
 */

export const BankSwitch = connect(
  null,
  dispatch => ({
    handleChange: () => dispatch(toggleBank())
  })
)(Switch);
