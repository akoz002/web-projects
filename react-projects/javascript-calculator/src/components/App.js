
import React from 'react';
import { connect } from 'react-redux';
import ButtonGrid from './ButtonGrid';

/*
 * The main app.
 */

const App = ({ expr, input }) => (
  <main>
    <section id="display-section">
      <div id="expr">{expr}</div>
      <div id="display">{input}</div>
    </section>
    <ButtonGrid />
  </main>
);

const ConnectedApp = connect(
  state => ({
    expr: state.expr,
    input: state.input
  })
)(App);

export default ConnectedApp;
