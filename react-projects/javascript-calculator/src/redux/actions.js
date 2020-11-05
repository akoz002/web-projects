
/*
 * Action types.
 */

export const APPEND_NUMBER = 'APPEND_NUMBER';
export const APPEND_DECIMAL = 'APPEND_DECIMAL';
export const APPEND_OPERATOR = 'APPEND_OPERATOR';
export const EVAL_EXPR = 'EVAL_EXPR';
export const CLEAR_EXPR = 'CLEAR_EXPR';

/*
 * Action creators.
 */

/*
 * Append a number to the expression.
 */

export const appendNumber = num => ({
  type: APPEND_NUMBER,
  num
});

/*
 * Append a decimal point to the expression.
 */

export const appendDecimal = () => ({
  type: APPEND_DECIMAL
});

/*
 * Append an operator to the expression.
 */

export const appendOperator = operator => ({
  type: APPEND_OPERATOR,
  operator
});

/*
 * Evaluate the current expression.
 */

export const evalExpr = () => ({
  type: EVAL_EXPR
});

/*
 * Clears the current expression.
 */

export const clearExpr = () => ({
  type: CLEAR_EXPR
});
