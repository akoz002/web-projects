
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

class StartStopButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyRelease = this.handleKeyRelease.bind(this);
  }

  handleClick() {
    const {
      timerID, startTimer, stopTimer, decrementCurrentTime
    } = this.props;

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
  }

  handleKeyPress(event) {
    if (!this.state.pressed && event.key === 'Enter') {
      this.setState({
        pressed: true
      });

      this.handleClick();
    }
  }

  handleKeyRelease(event) {
    if (event.key === 'Enter') {
      this.setState({
        pressed: false
      });
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
    document.addEventListener('keyup', this.handleKeyRelease);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
    document.removeEventListener('keyup', this.handleKeyRelease);
  }

  render() {
    return (
      <button className="start-reset-buttons"
        style={this.state.pressed ? { borderStyle: "inset" } : {}}
        onClick={this.handleClick}>
        { this.props.timerID ? <i className="fas fa-pause-circle" />
                             : <i className="fas fa-play-circle" /> }
      </button>
    );
  }
}

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
