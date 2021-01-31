
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

  activateButton() {
    /* If the active element is either <body>, <html> or null, it means that
    no interactable element on the page has focus. In this case, the "Enter"
    key press activates this button. */
    if (document.activeElement === document.body ||
        document.activeElement === document.documentElement ||
        document.activeElement === null) {
          return true;
    }
    return false;
  }

  handleKeyPress(event) {
    if (!this.state.pressed && event.key === 'Enter' && this.activateButton()) {
      this.setState({
        pressed: true
      });

      this.props.onClick();
    }
  }

  handleKeyRelease(event) {
    if (event.key === 'Enter' && this.activateButton()) {
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
