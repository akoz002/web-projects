
import { select } from 'd3-selection';
import { scalePoint } from 'd3-scale';
import { axisBottom } from 'd3-axis';

import {
  CANVAS_WIDTH,
  PADDING_TOP
} from './params';

import {
  TEMP_HUE_MAPPING,
  getCellColor
} from './getColors';

/*
 * Adds the legend.
 */

const addLegend = () => {
  const legendX = CANVAS_WIDTH * 0.38;
  const legendY = PADDING_TOP * 0.44;
  const legendWidth = 400;
  const legendHeight = 40;

  // legend x scale
  const legendScale = scalePoint()
      .domain(Object.keys(TEMP_HUE_MAPPING).concat('13'))
      .range([legendX, legendX + legendWidth]);

  // plot the legend
  select('svg')
    .append('g')
      .attr('id', 'legend')
    .selectAll('rect')
    .data(Object.keys(TEMP_HUE_MAPPING))
    .enter()
    .append('rect')
      .attr('x', d => legendScale(d))
      .attr('y', legendY)
      .attr('width', legendScale.step())
      .attr('height', legendHeight)
      .attr('fill', d => {
        for (let temp in TEMP_HUE_MAPPING) {
          if (temp === d) {
            return getCellColor(temp);
          }
        }
      });

  // legend axis
  const legendAxis = axisBottom(legendScale)
      .tickPadding(10)
      .tickSizeOuter(0)
      .tickValues(Object.keys(TEMP_HUE_MAPPING).slice(1));

  select('#legend')
    .append('g')
      .attr('id', 'legend-axis')
      .attr('transform', `translate(0, ${legendY + legendHeight})`)
      .call(legendAxis);

  // legend title
  select('#legend')
    .append('text')
      .attr('x', legendX + legendWidth * 0.35)
      .attr('y', legendY * 0.6)
      .text('Temp Scale (\u00B0C)');
};

export default addLegend;
