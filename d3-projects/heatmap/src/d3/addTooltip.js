
import { select, selectAll } from 'd3-selection';
import { transition } from 'd3-transition';
import { timeFormat } from 'd3-time-format';
import { format } from 'd3-format';
import { getTooltipColor } from './getColors';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './params';

/*
 * Adds the tooltip and cell overlay.
 */

const addTooltip = () => {
  // the tooltip box
  select('main#svg-container')
    .append('div')
      .attr('id', 'tooltip')
      .style('opacity', 0);

  // the cell overlay
  select('svg')
    .append('rect')
      .attr('id', 'overlay')
      .style('opacity', 0);

  // add mouse-over event handlers to every cell
  selectAll('.cell')
      .on('mouseover', (d, i, nodes) => {
        const cell = nodes[i];
        const x = Number(cell.attributes.x.value);
        const y = Number(cell.attributes.y.value);
        const width = Number(cell.attributes.width.value);
        const height = Number(cell.attributes.height.value);

        const dataMonth = cell.attributes['data-month'].value;
        const dataYear = cell.attributes['data-year'].value;
        const dataTemp = cell.attributes['data-temp'].value;

        // position the tooltip
        // tooltipX and tooltipY units are % of parent container dimensions
        const tooltipX = x / CANVAS_WIDTH * 100;
        // offset y by 4% of the height of the parent container
        const tooltipY = (y / CANVAS_HEIGHT * 100) - 4;

        select('#tooltip')
            .attr('data-year', dataYear)
            .style('left', `${tooltipX}%`)
            .style('top', `${tooltipY}%`)
            .style('background-color', getTooltipColor(Number(dataTemp)))
            .html(() => {
              const date = new Date(0);
              date.setUTCMonth(dataMonth);
              const monthStr = timeFormat("%b")(date);
              const tempStr = format(".2f")(dataTemp);
              return `${monthStr} - ${dataYear}<br>${tempStr} \u00B0C`;
            })
          .transition()
            .duration(200)
            .style('opacity', 0.95);

        // position the overlay
        select('#overlay')
            .attr('x', x)
            .attr('y', y)
            .attr('width', width)
            .attr('height', height)
            .attr('fill', 'white')
            .style('opacity', 1);
      })
      .on('mouseout', () => {
        // fade out the tooltip and overlay
        select('#tooltip')
          .transition()
            .duration(200)
            .style('opacity', 0);

        select('#overlay')
            .style('opacity', 0);
      });
};

export default addTooltip;
