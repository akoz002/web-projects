
import { select, selectAll } from 'd3-selection';
import { transition } from 'd3-transition';
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  PADDING_TOP,
  PADDING_BOT,
  PADDING_LEFT,
  PADDING_RIGHT
} from './params';

/*
 * Adds tooltip and highlight overlay.
 */

const addTooltip = colorScale => {
  // create the tooltip div
  select('main#svg-container')
    .append('div')
      .attr('id', 'tooltip')
      .style('opacity', 0);

  // create the highlight overlay
  select('svg')
    .append('rect')
      .attr('id', 'overlay')
      .style('opacity', 0);

  // add the mouseover event handlers
  selectAll('.tile')
      .on('mouseover', (d, i, nodes) => {
        const rect = nodes[i];
        const {name, category, value} = rect.dataset;
        const x = d.x0 + PADDING_LEFT;
        const y = d.y0 + PADDING_TOP;
        const width = d.x1 - d.x0;
        const height = d.y1 - d.y0;

        // position the tooltip
        // tooltipX and tooltipY units are % of parent container dimensions
        // offset x by 25% of the width of the cell
        const tooltipX = Math.min(
          (x + width * 0.25) / CANVAS_WIDTH * 100,
          85 // no more than 85% across
        );
        // offset y by 3% of the height of the parent container
        const tooltipY = (y / CANVAS_HEIGHT * 100) - 3;

        select('#tooltip')
            .attr('data-value', value)
            .style('left', `${tooltipX}%`)
            .style('top', `${tooltipY}%`)
            .html(`<b>Title:</b> ${name}<br>` +
                  `<b>Platform:</b> ${category}<br>` +
                  `<b>Value:</b> ${value}`)
          .transition()
            .duration(200)
            .style('opacity', 0.95);

        // position the overlay
        select('#overlay')
            .attr('x', x)
            .attr('y', y)
            .attr('width', width)
            .attr('height', height)
            .style('opacity', 1);
      })
      .on('mouseout', () => {
        // fade out the tooltip and the overlay
        select('#tooltip')
          .transition()
            .duration(200)
            .style('opacity', 0);

        select('#overlay')
            .style('opacity', 0);
      });
};

export default addTooltip;
