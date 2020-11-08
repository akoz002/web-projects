
/*
 * freeCodeCamp Front End Libraries Certification
 * Project 4: JavaScript Calculator
 * Alex Kozlov, 2020
 *
 * A calculator app which performs basic integer and floating point arithmetic.
 * Implemented in React in combination with Redux for state management.
 */

import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App';
import rootReducer from './redux/reducers';

/*
 * Render the main app.
 */

const store = createStore(rootReducer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
