
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
import { Provider } from 'react-redux';
import App from './components/App';
import store from './redux/reducers';

/*
 * Render the main app.
 */

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
