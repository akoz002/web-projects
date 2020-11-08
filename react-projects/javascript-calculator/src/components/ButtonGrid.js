
import React from 'react';
import {
  NumberButton,
  OperatorButton,
  DecimalButton,
  EqualsButton,
  ClearButton
} from './Button';

/*
 * Button grid (keypad).
 */

const numbers = [
  {
    id: 'zero',
    char: '0'
  },
  {
    id: 'one',
    char: '1'
  },
  {
    id: 'two',
    char: '2'
  },
  {
    id: 'three',
    char: '3'
  },
  {
    id: 'four',
    char: '4'
  },
  {
    id: 'five',
    char: '5'
  },
  {
    id: 'six',
    char: '6'
  },
  {
    id: 'seven',
    char: '7'
  },
  {
    id: 'eight',
    char: '8'
  },
  {
    id: 'nine',
    char: '9'
  }
];

const operators = [
  {
    id: 'add',
    char: '+'
  },
  {
    id: 'subtract',
    char: '-'
  },
  {
    id: 'multiply',
    char: '*'
  },
  {
    id: 'divide',
    char: '/'
  }
];

const ButtonGrid = () => (
  <section id="button-grid">
    {numbers.map(button => (
      <NumberButton key={button.id}
        id={button.id}
        char={button.char} />
    ))}
    {operators.map(button => (
      <OperatorButton key={button.id}
        id={button.id}
        char={button.char} />
    ))}
    <DecimalButton
      id="decimal"
      char="." />
    <EqualsButton
      id="equals"
      char="=" />
    <ClearButton
      id="clear"
      char="AC" />
  </section>
);

export default ButtonGrid;
