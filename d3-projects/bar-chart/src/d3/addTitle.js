
import { select } from 'd3-selection';

/*
 * Adds an <h1> title to the document.
 */

const addTitle = () => {
  select('body')
    .append('h1')
      .text('United States GDP')
      .attr('id', 'title');
};

export default addTitle;
