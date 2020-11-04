/*
 * freeCodeCamp Front End Libraries Certification
 * Project 1: Random Quote Generator
 * Alex Kozlov, 2020
 *
 * A simple React component that displays a random quote from the
 * given array of quotes.
 *
 * Required props:
 *    quotes: an array of quote objects to select from, where each quote object
 *        is in the following form:
 *            { quote: "...", author: "..." }
 *    title: the title text to display in the app
 *    buttonText: the text to diplay in the "generate new quote" button
 */

import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quoteIndex: this.getNewQuoteIndex()
    };
    this.handleClick = this.handleClick.bind(this);
  }

  getNewQuoteIndex() {
    return Math.floor(Math.random() * this.props.quotes.length);
  }

  handleClick() {
    this.setState({
      quoteIndex: this.getNewQuoteIndex()
    });
  }

  render() {
    return (
      <div id="background">
        <main id="quote-box">
          <h1>{this.props.title}</h1>
          <section>
            <p id="text">
              {this.props.quotes[this.state.quoteIndex].quote}
            </p>
            <p id="author">
              - {this.props.quotes[this.state.quoteIndex].author}
            </p>
          </section>
          <footer>
            <button id="new-quote"
              onClick={this.handleClick}>
              {this.props.buttonText}
            </button>
            <a id="tweet-quote"
              href="https://twitter.com/intent/tweet"
              target="_blank">
              <i className="fab fa-twitter-square"></i>
            </a>
          </footer>
        </main>
      </div>
    );
  }
}
