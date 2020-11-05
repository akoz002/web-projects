
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

const Button = ({ id, char, onClick }) => (
  <button id={id} className="button"
    onClick={() => onClick(char)}>
    {char}
  </button>
);

/*
 * Number button (0-9).
 */

export const NumberButton = connect(
  null,
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
