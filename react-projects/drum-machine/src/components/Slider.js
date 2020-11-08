
import React from 'react';
import { connect } from 'react-redux';
import { updateVolume } from '../redux/actions';

/*
 * A generic Slider input in the range 0 - 100.
 * Can be clicked or dragged to set.
 */

const Slider = ({ desc, stateDesc, value, onChange }) => (
  <div className="slider">
    <p>{desc}:
      <span className="state-desc">{' ' + stateDesc}</span>
    </p>
    <input type="range" min="0" max="100" className="range-input"
      value={value}
      onChange={e => onChange(e.target.value)} />
  </div>
);

/*
 * The Volume slider.
 */

const VolumeSlider = connect(
  null,
  dispatch => ({
    onChange: volume => dispatch(updateVolume(volume))
  })
)(Slider);

export default VolumeSlider;
