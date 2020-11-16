
import { select } from 'd3-selection';

/*
 * Adds a title and a description.
 */

const addTitle = () => {
  select('body')
    .append('h1')
      .attr('id', 'title')
      .text('Global Land-Surface Temperature');

  select('body')
    .append('p')
      .attr('id', 'description')
      .text('1753 - 2015');
};

export default addTitle;
