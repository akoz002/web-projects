/*
 * freeCodeCamp Front End Libraries Certification
 * Project 4: JavaScript Calculator
 * Alex Kozlov, 2020
 *
 * A calculator app which performs basic integer and floating point arithmetic.
 * Implemented in React in combination with Redux for state management.
 */

/*****************
 ***   Redux   ***
 *****************/

const { createStore } = Redux;

/*
 * Action types.
 */

const APPEND_NUMBER = 'APPEND_NUMBER';
const APPEND_DECIMAL = 'APPEND_DECIMAL';
const APPEND_OPERATOR = 'APPEND_OPERATOR';
const EVAL_EXPR = 'EVAL_EXPR';
const CLEAR_EXPR = 'CLEAR_EXPR';

/*
 * Action creators.
 */

/*
 * Append a number to the expression.
 */

const appendNumber = num => ({
  type: APPEND_NUMBER,
  num
});

/*
 * Append a decimal point to the expression.
 */

const appendDecimal = () => ({
  type: APPEND_DECIMAL
});

/*
 * Append an operator to the expression.
 */

const appendOperator = operator => ({
  type: APPEND_OPERATOR,
  operator
});

/*
 * Evaluate the current expression.
 */

const evalExpr = () => ({
  type: EVAL_EXPR
});

/*
 * Clears the current expression.
 */

const clearExpr = () => ({
  type: CLEAR_EXPR
});

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
 * The Redux store.
 */

const reduxStore = createStore(rootReducer);
reduxStore.subscribe(() => console.log(reduxStore.getState()));

/*****************
 ***   React   ***
 *****************/

const { 
  render 
} = ReactDOM;

const { 
  connect,
  Provider
} = ReactRedux;

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

const mapDispatchToNumberProps = dispatch => ({
  onClick: num => dispatch(appendNumber(num))
});

const NumberButton = connect(
  null,
  mapDispatchToNumberProps
)(Button);

/*
 * Decimal point (.) button.
 */

const mapDispatchToDecimalProps = dispatch => ({
  onClick: () => dispatch(appendDecimal())
});

const DecimalButton = connect(
  null,
  mapDispatchToDecimalProps
)(Button);

/*
 * Operator button (+-/*).
 */

const mapDispatchToOperatorProps = dispatch => ({
  onClick: operator => dispatch(appendOperator(operator))
});

const OperatorButton = connect(
  null,
  mapDispatchToOperatorProps
)(Button);

/*
 * Equals button (=).
 */

const mapDispatchToEqualsProps = dispatch => ({
  onClick: () => dispatch(evalExpr())
});

const EqualsButton = connect(
  null,
  mapDispatchToEqualsProps
)(Button);

/*
 * Clear button.
 */

const mapDispatchToClearProps = dispatch => ({
  onClick: () => dispatch(clearExpr())
});

const ClearButton = connect(
  null,
  mapDispatchToClearProps
)(Button);

/*
 * Button grid (keypad).
 */

const ButtonGrid = () => {
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

  return (
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
};

/*
 * The main app.
 */

const App = ({ expr, input }) => (
  <div id="background">
    <main id="main">
      <section id="display-section">
        <p id="expr">{expr}</p>
        <p id="display">{input}</p>
      </section>
      <ButtonGrid />
    </main>
  </div>
);

const mapStateToAppProps = state => ({
  expr: state.expr,
  input: state.input
});

const AppContainer = connect(
  mapStateToAppProps
)(App);

/*
 * Render the main app.
 */

render(
  <Provider store={reduxStore}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
);