
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
        const mousePos = mouse(select('svg').node());
        const tooltipX = Math.max(1,
          Math.min((mousePos[0] / CANVAS_WIDTH * 100) - 7, 75));
        const tooltipY = (mousePos[1] / CANVAS_HEIGHT * 100) - 14;

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
