
import React from 'react';

/*
 * A generic button to update (increment or decrement) a duration.
 */

export default class UpdateButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: false
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyRelease = this.handleKeyRelease.bind(this);
  }

  isCorrectKey(event) {
    const { keyboardKey, shiftActivated } = this.props;

    if (shiftActivated) {
      if (event.altKey && event.shiftKey && event.key === keyboardKey) {
        return true;
      }
      return false;
    }

    // by default alt activated
    if (event.altKey && !event.shiftKey && event.key === keyboardKey) {
      return true;
    }

    return false;
  }

  handleKeyPress(event) {
    if (this.isCorrectKey(event)) {
      this.setState({
        pressed: true
      });

      this.props.onClick();
    }
  }

  handleKeyRelease(event) {
    if (this.isCorrectKey(event)) {
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
      <button onClick={this.props.onClick}
        style={this.state.pressed ? { borderStyle: "inset" } : {}}>
        <i className={this.props.faIcon} />
        <div className="screen-reader-only">{this.props.screenReaderText}</div>
      </button>
    );
  }
}
