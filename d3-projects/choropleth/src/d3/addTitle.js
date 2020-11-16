
import { select } from 'd3-selection';

/*
 * Adds a title.
 */

const addTitle = () => {
  select('body')
    .append('h1')
      .attr('id', 'title')
      .text('U.S. Educational Level');
};

export default addTitle;
