
import { select, selectAll, mouse } from 'd3-selection';
import { transition } from 'd3-transition';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './params';

/*
 * Adds a tooltip and county overlay.
 */

const addTooltip = eduMap => {
  // the tooltip container
  select('main#svg-container')
    .append('div')
      .attr('id', 'tooltip')
      .style('opacity', 0);

  // the overlay for highlighting selected county
  select('#choropleth')
    .append('path')
      .attr('id', 'overlay')
      .style('opacity', 0);

  // add mouseover event handlers for county plots
  selectAll('.county')
      .on('mouseover', (d, i, nodes) => {
        const path = nodes[i];
        const pathData = path.attributes.d.value;
        const dataID = path.attributes['data-fips'].value;
        const {state, area_name, bachelorsOrHigher} =
              eduMap.get(dataID);

        // position the tooltip
        // tooltipX and tooltipY units are % of <svg> viewBox dimensions
        const mousePos = mouse(select('svg').node());
        // shift to the right by 3% of <svg> viewBox width
        const tooltipX = Math.min(
          (mousePos[0] / CANVAS_WIDTH * 100) + 3,
          80 // no more than 80% to the right
        );
        // shift upwards by 4% of <svg> viewBox height
        const tooltipY = (mousePos[1] / CANVAS_HEIGHT * 100) - 4;

        select('#tooltip')
            .attr('data-education', bachelorsOrHigher)
            .style('left', `${tooltipX}%`)
            .style('top', `${tooltipY}%`)
            .html(`${area_name}, ${state}<br>` +
                  `${bachelorsOrHigher} %`)
          .transition()
            .duration(200)
            .style('opacity', 0.95);

        // position the overlay
        select('#overlay')
            .attr('d', pathData)
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
