
import React from 'react';

/*
 * Button to update the displayed quote.
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

  handleKeyPress(event) {
    if (!this.state.pressed && event.key === 'Enter') {
      this.setState({
        pressed: true
      });

      this.props.onClick();
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
      <button onClick={this.props.onClick}
        style={this.state.pressed ? { borderStyle: "inset" } : {}}>
        {this.props.buttonText}
      </button>
    );
  }
}
