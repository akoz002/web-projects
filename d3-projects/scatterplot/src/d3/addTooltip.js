
import { select, selectAll } from 'd3-selection';
import { transition } from 'd3-transition';
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  COLOR_DOPING_OVERLAY,
  COLOR_NON_DOPING_OVERLAY,
  COLOR_DOPING_TOOLTIP,
  COLOR_NON_DOPING_TOOLTIP
} from './params';

/*
 * Adds a tooltip and an overlay to highlight selected circle.
 */

const addTooltip = () => {
  // the tooltip box
  select('#svg-div')
    .append('div')
      .attr('id', 'tooltip')
      .style('opacity', 0);

  // overlay to highlight selected circle
  select('svg')
    .append('circle')
      .attr('id', 'overlay')
      .style('opacity', 0);

  // add mouse-over event handlers
  selectAll('.dot')
      .on('mouseover', (d, i, nodes) => {
        const circle = nodes[i];
        const cx = Number(circle.attributes.cx.value);
        const cy = Number(circle.attributes.cy.value);
        const r = Number(circle.attributes.r.value);
        const dataXValue = circle.attributes['data-xvalue'].value;

        // the tooltip box
        const leftOffset = (cx / CANVAS_WIDTH * 100) - 6;
        const topOffset = (cy / CANVAS_HEIGHT * 100) -
              (d['Doping'] !== "" ? 39 : 29);

        select('#tooltip')
            .attr('data-year', dataXValue)
            .style('left', `${leftOffset}%`)
            .style('top', `${topOffset}%`)
            .style('background-color', d['Doping'] !== "" ?
                   COLOR_DOPING_TOOLTIP : COLOR_NON_DOPING_TOOLTIP)
            .style('border-color', d['Doping'] !== "" ?
                   COLOR_DOPING_OVERLAY : COLOR_NON_DOPING_OVERLAY)
            .html(`<b>${d['Name']}</b>` +
                  `<br>Nationality: ${d['Nationality']}` +
                  `<br>Year: ${d['Year']}` +
                  `<br>Time: ${d['Time']}` +
                  (d['Doping'] !== "" ? `<br><br>${d['Doping']}` : ""));

        // transition to fade in the tooltip
        select('#tooltip')
          .transition()
            .duration(200)
            .style('opacity', 0.9);

        // the circle overlay
        select('#overlay')
            .attr('cx', cx)
            .attr('cy', cy)
            .attr('r', r)
            .attr('fill', d['Doping'] !== "" ?
                  COLOR_DOPING_OVERLAY : COLOR_NON_DOPING_OVERLAY)
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
