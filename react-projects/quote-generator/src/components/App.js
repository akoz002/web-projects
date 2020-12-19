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
import UpdateButton from './UpdateButton';

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
    let newIndex;
    do {
      newIndex = this.getNewQuoteIndex();
    } while (newIndex === this.state.quoteIndex);

    this.setState({
      quoteIndex: newIndex
    });
  }

  render() {
    return (
      <main>
        <h1>{this.props.title}</h1>
        <section>
          <p id="text">
            {this.props.quotes[this.state.quoteIndex].quote}
          </p>
          <p id="author">
            - {this.props.quotes[this.state.quoteIndex].author}
          </p>
        </section>
        <UpdateButton onClick={this.handleClick}
          buttonText={this.props.buttonText} />
        <footer>
          <a id="tweet-quote"
            href="https://twitter.com/intent/tweet"
            target="_blank">
            <i className="fab fa-twitter-square"></i>
          </a>
          <p>
            Implemented by Alex Kozlov for <a href="http://www.freecodecamp.org"
            target="_blank">freeCodeCamp</a>.
          </p>
        </footer>
      </main>
    );
  }
}
