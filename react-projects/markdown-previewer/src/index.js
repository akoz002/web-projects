
/*
 * freeCodeCamp Front End Libraries Certification
 * Project 2: Markdown Previewer
 * Alex Kozlov, 2020
 *
 * A simple React app that previews markdown text as it is typed
 * into the editor. Consists of a single stateful component and a
 * couple of stateless functional child components.
 */

import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

/*
 * Create some initial markdown and render the App.
 */

const initialMarkdown = `# Level 1 Heading
## Level 2 Heading
### Level 3 Heading

Inline code: \`<section></section>\`

Multi-line code:

\`\`\`
// this is multi-line code:

function anotherExample(a, b) {
  if (a == '...' && b == '...') {
    return multiLineCode;
  }
}
\`\`\`

Text formatting: **bold**, _italic_, **_both_**, ~~crossed out~~

This is a [Link](https://www.freecodecamp.org).

> This is a Block Quote.

Table Header | Second Header | Third Header
------------ | ------------- | -------------
Data (1,1)   | Data (1,2)    | Data (1,3)
Data (2,1)   | Data (2,2)    | Data (2,3)

- Bulleted list.
  - Indent level 1.
    - Indent level 2.
      - Indent level 3.

1. Numbered list.
2. Numbered item 2.
3. Numbered item 3.
`;

render(
  <App initialMarkdown={initialMarkdown} />,
  document.getElementById('root')
);
