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

class QuoteGenApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quoteIndex: this.getNewQuoteIndex() };

    this.handleClick = this.handleClick.bind(this);
  }

  getNewQuoteIndex() {
    return Math.floor(Math.random() * this.props.quotes.length);
  }

  handleClick() {
    this.setState({
      quoteIndex: this.getNewQuoteIndex() });

  }

  render() {
    return (
      React.createElement("div", { id: "background" },
      React.createElement("main", { id: "quote-box" },
      React.createElement("h1", null, this.props.title),
      React.createElement("section", null,
      React.createElement("p", { id: "text" },
      this.props.quotes[this.state.quoteIndex].quote),

      React.createElement("p", { id: "author" }, "- ",
      this.props.quotes[this.state.quoteIndex].author)),


      React.createElement("footer", null,
      React.createElement("button", { id: "new-quote",
        onClick: this.handleClick },
      this.props.buttonText),

      React.createElement("a", { id: "tweet-quote",
        href: "https://twitter.com/intent/tweet",
        target: "_blank" },
      React.createElement("i", { className: "fab fa-twitter-square" }))))));





  }}


/*
      * Generate some quotes and render the QuoteGenApp component.
      */

const AUTHOR = "Confucius";
const QUOTES = [
{ quote: "Only foolish man try run down hill with pants falling down.",
  author: AUTHOR + " Quote 1" },
{ quote: "Man who walk in front of car get tired.",
  author: AUTHOR + " Quote 2" },
{ quote: "Man who walk behind car get exhausted.",
  author: AUTHOR + " Quote 3" },
{ quote: "Man who drops watch in toilet will have shitty time.",
  author: AUTHOR + " Quote 4" },
{ quote: "Wise man never play leapfrog with unicorn.",
  author: AUTHOR + " Quote 5" },
{ quote: "Man trapped in pantry have ass in jam.",
  author: AUTHOR + " Quote 6" },
{ quote: "Man stand on toilet, is high on pot.",
  author: AUTHOR + " Quote 7" },
{ quote: "Man who run through airport turnstile sideways going to Bangkok.",
  author: AUTHOR + " Quote 8" },
{ quote: "Man who fish in another man's well, often catch crabs.",
  author: AUTHOR + " Quote 9" },
{ quote: "Man who leap off cliff jump to conclusion.",
  author: AUTHOR + " Quote 10" },
{ quote: "Man who throws dirt is losing ground.",
  author: AUTHOR + " Quote 11" },
{ quote: "Man with head on railroad track listening for train, get splitting headache.",
  author: AUTHOR + " Quote 12" },
{ quote: "Man who drive like hell, bound to get there.",
  author: AUTHOR + " Quote 13" },
{ quote: "Man who sit on tack, rise above all.",
  author: AUTHOR + " Quote 14" },
{ quote: "Man who read too many Confucius quotes, become little bit stupid.",
  author: AUTHOR + " Quote 15" }];


ReactDOM.render(
React.createElement(QuoteGenApp, {
  quotes: QUOTES,
  title: AUTHOR + " Say",
  buttonText: "Enlighten us, oh great master!" }),
document.getElementById('root'));