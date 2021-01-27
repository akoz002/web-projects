
import React from 'react';
import { connect } from 'react-redux';
import { updateDrumPad } from '../redux/actions';

/*
 * A Drum Pad button that plays a drum sample audio.
 */

class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    /* keep local "pressed" state, this is used for styling */
    this.state = {
      pressed: false
    };
    this.pressButton = this.pressButton.bind(this);
    this.releaseButton = this.releaseButton.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyRelease = this.handleKeyRelease.bind(this);
  }

  pressButton() {
    // do nothing if the app is powered off
    if (!this.props.powerOn) {
      return;
    }

    // set the local state to "pressed"
    this.setState({
      pressed: true
    });

    // dispatch action to update the played drum pad name
    this.props.onDrumPlay(this.props.name);

    // play the audio
    const audio = document.getElementById(this.props.keyboardKey);
    audio.currentTime = 0;
    audio.volume = this.props.volume / 100;
    audio.play();
  }

  releaseButton() {
    this.setState({
      pressed: false
    });
  }

  handleKeyPress(event, keyboardKey = this.props.keyboardKey) {
    if (!this.state.pressed && event.key.toUpperCase() === keyboardKey) {
      this.pressButton();
    }
  }

  handleKeyRelease(event, keyboardKey = this.props.keyboardKey) {
    if (event.key.toUpperCase() === keyboardKey) {
      this.releaseButton();
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
    /* style the button if it's "pressed" */
    let style = {};
    if (this.state.pressed) {
      style = {
        backgroundColor: "crimson",
        borderStyle: "inset"
      };
    }

    const id = this.props.name.toLowerCase().replace(/\s/g, '-');
    return (
      <button id={id} style={style}
        disabled={this.props.powerOn ? '' : 'disabled'}
        className="drum-pad"
        onMouseDown={this.pressButton}
        onMouseUp={this.releaseButton}
        onKeyDown={e => this.handleKeyPress(e, 'ENTER')}
        onKeyUp={e => this.handleKeyRelease(e, 'ENTER')}>
        <audio id={this.props.keyboardKey} className="clip"
          src={this.props.audioFile} />
        {this.props.keyboardKey}
      </button>
    );
  }
}

/*
 * A container for the <DrumPad> component to connect it to
 * the Redux store.
 */

const ConnectedDrumPad = connect(
  state => ({
    powerOn: state.powerOn,
    volume: state.volume
  }),
  dispatch => ({
    onDrumPlay: drumPadName => dispatch(updateDrumPad(drumPadName))
  })
)(DrumPad);

export default ConnectedDrumPad;
