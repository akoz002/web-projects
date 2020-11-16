
import { select } from 'd3-selection';

/*
 * Adds title and description.
 */

const addTitle = () => {
  select('body')
    .append('h1')
      .attr('id', 'title')
      .text('Video Game Sales');

  select('body')
    .append('p')
      .attr('id', 'description')
      .text('Top 100 Most Sold Video Games by Platform');
};

export default addTitle;
