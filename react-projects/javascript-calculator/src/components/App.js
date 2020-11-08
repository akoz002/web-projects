
import React from 'react';
import { connect } from 'react-redux';
import ButtonGrid from './ButtonGrid';

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

const ConnectedApp = connect(
  state => ({
    expr: state.expr,
    input: state.input
  })
)(App);

export default ConnectedApp;
