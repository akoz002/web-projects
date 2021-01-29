
import React from 'react';
import { connect } from 'react-redux';
import {
  appendNumber,
  appendDecimal,
  appendOperator,
  evalExpr,
  clearExpr
} from '../redux/actions';

/*
 * A generic Button.
 */

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: false
    };

    this.pressButton = this.pressButton.bind(this);
    this.releaseButton = this.releaseButton.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyRelease = this.handleKeyRelease.bind(this);
  }

  pressButton() {
    this.setState({
      pressed: true
    });

    this.props.onClick(this.props.char);
  }

  releaseButton() {
    this.setState({
      pressed: false
    });
  }

  isCorrectKey(pressedKey, hasFocus) {
    if (hasFocus && 'Enter' === pressedKey) {
      return true;
    }

    const { char, additionalKeys } = this.props;

    if (char === pressedKey) {
      return true;
    }
    if (additionalKeys && additionalKeys.includes(pressedKey)) {
      if (pressedKey === "Enter") {
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
      return true;
    }
    return false;
  }

  handleKeyPress(event, hasFocus = false) {
    // multiple presses on hold
    if (this.props.multiPressOnHold) {
      if (this.isCorrectKey(event.key, hasFocus)) {
        this.pressButton();
      }
    } // single press on hold
    else if (!this.state.pressed && this.isCorrectKey(event.key, hasFocus)) {
      this.pressButton();
    }
  }

  handleKeyRelease(event, hasFocus = false) {
    if (this.isCorrectKey(event.key, hasFocus)) {
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
    return (
      <button id={this.props.id}
        style={this.state.pressed ? { borderStyle: "inset" } : {}}
        onMouseDown={this.pressButton}
        onMouseUp={this.releaseButton}
        onKeyDown={e => this.handleKeyPress(e, true)}
        onKeyUp={e => this.handleKeyRelease(e, true)}>
        {this.props.char}
      </button>
    );
  }
}

/*
 * Number button (0-9).
 */

export const NumberButton = connect(
  () => ({
    multiPressOnHold: true
  }),
  dispatch => ({
    onClick: num => dispatch(appendNumber(num))
  })
)(Button);

/*
 * Decimal point (.) button.
 */

export const DecimalButton = connect(
  null,
  dispatch => ({
    onClick: () => dispatch(appendDecimal())
  })
)(Button);

/*
 * Operator button (+-/*).
 */

export const OperatorButton = connect(
  null,
  dispatch => ({
    onClick: operator => dispatch(appendOperator(operator))
  })
)(Button);

/*
 * Equals button (=).
 */

export const EqualsButton = connect(
  null,
  dispatch => ({
    onClick: () => dispatch(evalExpr())
  })
)(Button);

/*
 * Clear button.
 */

export const ClearButton = connect(
  null,
  dispatch => ({
    onClick: () => dispatch(clearExpr())
  })
)(Button);
