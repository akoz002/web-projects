
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

/*
 * Generate some quotes and render the App component.
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
   author: AUTHOR + " Quote 15" }
];

ReactDOM.render(
  <App quotes={QUOTES}
    title={AUTHOR + " Say"}
    buttonText="Enlighten us, oh great master!" />,
  document.getElementById('root')
);
