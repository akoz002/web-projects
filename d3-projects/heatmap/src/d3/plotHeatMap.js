
import { select } from 'd3-selection';
import { extent, range } from 'd3-array';
import { scaleBand } from 'd3-scale';
import { getCellColor } from './getColors';
import addTooltip from './addTooltip';
import addAxes from './addAxes';
import addLegend from './addLegend';
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  PADDING_TOP,
  PADDING_BOT,
  PADDING_LEFT,
  PADDING_RIGHT
} from './params';

/*
 * Top-level function to plot the heat map.
 */

const plotHeatMap = json => {
  const baseTemp = json.baseTemperature;
  const dataset = json.monthlyVariance;

  // x scale
  const xExtent = extent(dataset, d => d.year);
  const xScale = scaleBand()
      .domain(range(xExtent[0], xExtent[1] + 1))
      .range([PADDING_LEFT, CANVAS_WIDTH - PADDING_RIGHT]);

  // y scale
  const yScale = scaleBand()
      .domain(range(0, 12))
      .range([CANVAS_HEIGHT - PADDING_BOT, PADDING_TOP]);

  // create the SVG canvas
  select('main#svg-container')
    .append('svg')
      .attr('viewBox', `0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`);

  // plot the heat map
  select('svg')
    .selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
      .attr('x', d => xScale(d.year))
      .attr('y', d => yScale(d.month - 1))
      .attr('width', xScale.bandwidth())
      .attr('height', yScale.bandwidth())
      .attr('fill', d => getCellColor(baseTemp + d.variance))
      .attr('class', 'cell')
      .attr('data-month', d => d.month - 1)
      .attr('data-year', d => d.year)
      .attr('data-temp', d => baseTemp + d.variance);

  // add axes and axis labels
  addAxes(xScale, yScale);

  // add the legend
  addLegend();

  // add the tooltip
  addTooltip();
};

export default plotHeatMap;
