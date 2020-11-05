
import { createStore } from 'redux';
import {
  APPEND_NUMBER,
  APPEND_DECIMAL,
  APPEND_OPERATOR,
  EVAL_EXPR,
  CLEAR_EXPR
} from './actions';

/*
 * Reducers.
 */

const initialState = {
  expr: '',
  input: '0'
};

/*
 * Append a number to the expression and the input.
 */

const appendNumberReducer = (state, action) => {
  // if we have an evaluated expression
  // or the current input is a zero
  if (state.expr.match(/=/) || state.input === '0') {
    return Object.assign({}, state, {
      expr: action.num,
      input: action.num
    });
  }

  // append the number to the expression and the input
  const newState = Object.assign({}, state, {
    expr: state.expr.concat(action.num),
    input: state.input.concat(action.num)
  });

  // if the current input is an operator
  if (state.input.match(/[+\-*\/]/)) {
    newState.input = action.num;
  }

  return newState;
};

/*
 * Append a decimal point to the expression and the input.
 */

const appendDecimalReducer = (state, action) => {
  // if we have an evaluated expression
  // or the expression is empty
  if (state.expr.match(/=/) || state.expr === "") {
    return Object.assign({}, state, {
      expr: '0.',
      input: '0.'
    });
  }

  // if the input already contains a decimal point
  if (state.input.match(/\./)) {
    return state;
  }

  // if the current input is an operator
  if (state.input.match(/[+\-*\/]/)) {
    return Object.assign({}, state, {
      expr: state.expr.concat('0.'),
      input: '0.'
    });
  }

  // append the decimal point to the expression and the input
  return Object.assign({}, state, {
    expr: state.expr.concat('.'),
    input: state.input.concat('.')
  });
};

/*
 * Append an operator to the expression and the input.
 */

const appendOperatorReducer = (state, action) => {
  // if we have an evaluated expression
  if (state.expr.match(/=/)) {
    // 'input' contains the last result
    return Object.assign({}, state, {
      expr: state.input.concat(' ', action.operator, ' '),
      input: action.operator
    });
  }

  // append the operator to the expression,
  // set the input to the operator
  const newState = Object.assign({}, state, {
    expr: state.expr.concat(' ', action.operator, ' '),
    input: action.operator
  });

  // if the current input is an operator
  if (state.input.match(/[+\-*\/]/)) {
    // if appending a minus to a different operator
    // append as normal
    if (action.operator === "-" && state.input.match(/[+*\/]/)) {
      return newState;
    }

    // otherwise overwrite the last operator(s)
    return Object.assign({}, state, {
      expr: state.expr.replace(/[+\-*\/\s]+$/, ' ' + action.operator + ' '),
      input: action.operator
    });
  }

  return newState;
};

/*
 * Evaluate the expression.
 */

const evalExprReducer = (state, action) => {
  // if we have an evaluated expression
  // or the expression is empty
  if (state.expr.match(/=/) || state.expr === "") {
    return state;
  }

  // evaluate the expression, store result in the input
  // round to 4 decimal places
  const result = Math.round(eval(state.expr) * 10000) / 10000;
  return Object.assign({}, state, {
    expr: state.expr.concat(' = ', result),
    input: String(result)
  });
};

/*
 * The root reducer.
 */

const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case APPEND_NUMBER:
      return appendNumberReducer(state, action);

    case APPEND_DECIMAL:
      return appendDecimalReducer(state, action);

    case APPEND_OPERATOR:
      return appendOperatorReducer(state, action);

    case EVAL_EXPR:
      return evalExprReducer(state, action);

    case CLEAR_EXPR:
      return Object.assign({}, initialState);

    default:
      return state;
  }
};

/*
 * Export the store.
 */

export default createStore(rootReducer);
