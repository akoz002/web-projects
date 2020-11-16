
import { select } from 'd3-selection';

/*
 * Adds a title and sub-title to the document.
 */

const addTitle = () => {
  select('body')
    .append('h1')
      .attr('id', 'title')
      .text('Doping in Professional Cycling');

  select('body')
    .append('p')
      .attr('id', 'sub-title')
      .text("Fastest times up Alpe d'Huez");
};

export default addTitle;
