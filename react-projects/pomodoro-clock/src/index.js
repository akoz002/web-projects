
/*
 * freeCodeCamp Front End Libraries Certification
 * Project 5: Pomodoro Clock
 * Alex Kozlov, 2020
 *
 * A countdown timer that alternates between session and break periods.
 * Rings a chime when each period completes. Can be paused and resumed,
 * and the session and break durations can be changed.
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
  document.querySelector('#app')
);
