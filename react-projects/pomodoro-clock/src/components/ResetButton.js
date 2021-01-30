
import React from 'react';
import { connect } from 'react-redux';
import { resetState } from '../redux/actions';

/*
 * Reset button to reset to initial state.
 */

class ResetButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: false
    };

    this.keyboardKeys = [ 'Backspace', 'Delete' ];

    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyRelease = this.handleKeyRelease.bind(this);
  }

  handleClick() {
    const { timerID, resetState } = this.props;

    // stop playing audio
    const audio = document.getElementById('bell');
    audio.pause();
    audio.currentTime = 0;

    // clear the timer
    clearInterval(timerID);

    // reset the state
    resetState();
  }

  handleKeyPress(event) {
    if (!this.state.pressed && this.keyboardKeys.includes(event.key)) {
      this.setState({
        pressed: true
      });

      this.handleClick();
    }
  }

  handleKeyRelease(event) {
    if (this.keyboardKeys.includes(event.key)) {
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
        <i className="fas fa-sync-alt" />
        <div className="screen-reader-only">Reset</div>
      </button>
    );
  }
}

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
