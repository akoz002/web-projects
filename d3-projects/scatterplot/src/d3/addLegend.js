
import { select } from 'd3-selection';
import {
  COLOR_DOPING,
  COLOR_DOPING_OVERLAY,
  COLOR_NON_DOPING,
  COLOR_NON_DOPING_OVERLAY
} from './params';

/*
 * Adds a legend to the plot.
 */

const addLegend = () => {
  // the legend box is a 2x2 grid
  select('main#svg-container')
    .append('div')
      .attr('id', 'legend');

  // first row - "non doping data" legend
  select('#legend')
    .append('div')
      .attr('class', 'legend-tile')
      .style('background-color', COLOR_NON_DOPING)
      .style('border-color', COLOR_NON_DOPING_OVERLAY);

  select('#legend')
    .append('div')
      .text('- No doping allegations');

  // second row - "doping data" legend
  select('#legend')
    .append('div')
      .attr('class', 'legend-tile')
      .style('background-color', COLOR_DOPING)
      .style('border-color', COLOR_DOPING_OVERLAY);

  select('#legend')
    .append('div')
      .text('- Doping allegations');
};

export default addLegend;
