
import { select, selectAll } from 'd3-selection';
import { hierarchy, treemap } from 'd3-hierarchy';
import addTooltip from './addTooltip';
import plotLegend from './plotLegend';
import getColorScale from './getColorScale';
import {
  PLOT_WIDTH,
  PLOT_HEIGHT,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  PADDING_TOP,
  PADDING_BOT,
  PADDING_LEFT,
  PADDING_RIGHT
} from './params';

/*
 * The top level function to plot the treemap.
 */

const plotTreemap = dataset => {
  // get a color scale mapping platform names to colors
  const colorScale = getColorScale(dataset);

  // create the root node
  const root = hierarchy(dataset)
      .sum(d => d.value ? d.value : 0);

  // create the treemap
  const tree = treemap()
      .size([PLOT_WIDTH, PLOT_HEIGHT]);

  // get array of all leaf nodes
  const nodes = tree(root).leaves();

  // create the SVG canvas
  select('main#svg-container')
    .append('svg')
      .attr('viewBox', `0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`);

  // bind data and plot the treemap tile groups
  select('svg')
    .append('g')
      .attr('id', 'treemap')
      .attr('transform', `translate(${PADDING_LEFT}, ${PADDING_TOP})`)
    .selectAll('.tile-group')
    .data(nodes)
    .enter()
    .append('g')
      .attr('transform', d => `translate(${d.x0}, ${d.y0})`)
      .attr('class', 'tile-group');

  // plot the treemap tiles
  selectAll('.tile-group')
    .append('rect')
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .attr('fill', d => colorScale(d.data.category))
      .attr('data-name', d => d.data.name)
      .attr('data-category', d => d.data.category)
      .attr('data-value', d => d.data.value)
      .attr('class', 'tile');

  // plot the treemap tile labels
  selectAll('.tile-group')
    .append('text')
    .selectAll('tspan')
    .data(d => d.data.name.match(/[A-Z]+[^A-Z]*/g))
    .enter()
    .append('tspan')
      .attr('x', '0.3em')
      .attr('dy', '1em')
      .attr('class', 'tile-label')
      .text(d => d);

  // plot the legend
  plotLegend(colorScale);

  // add the tooltip and highlight overlay
  addTooltip(colorScale);
};

export default plotTreemap;
