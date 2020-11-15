
import { select } from 'd3-selection';
import { scaleTime, scaleLinear } from 'd3-scale';
import { extent, max } from 'd3-array';
import addTitle from './addTitle';
import addTooltip from './addTooltip';
import addAxes from './addAxes';

/*
 * The top level function that plots the bar chart.
 */

const plotBarChart = dataset => {
  addTitle();

  // use a 16:9 aspect ratio
  const canvasWidth = 1600;
  const canvasHeight = 900;
  const paddingTop = 200;
  const paddingBot = 180;
  const paddingLeft = 260;
  const paddingRight = 160;
  const columnWidth = (canvasWidth - paddingLeft - paddingRight) / dataset.length;

  // create the scales
  const xScale = scaleTime()
      .domain(extent(dataset, d => new Date(d[0])))
      .range([paddingLeft, canvasWidth - paddingRight]);

  const yScale = scaleLinear()
      .domain([0, max(dataset, d => d[1])])
      .range([canvasHeight - paddingBot, paddingTop]);

  // create the SVG canvas
  select('body')
    .append('div')
      .attr('id', 'svg-div')
      .style('position', 'relative')
    .append('svg')
      .attr("viewBox", `0 0 ${canvasWidth} ${canvasHeight}`);

  // plot the bars
  select('svg')
    .selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
      .attr('x', d => xScale(new Date(d[0])))
      .attr('y', d => yScale(d[1]))
      .attr('width', columnWidth)
      .attr('height', d => canvasHeight - paddingBot - yScale(d[1]))
      .attr('class', 'bar')
      .attr('data-date', d => d[0])
      .attr('data-gdp', d => d[1]);

  // add the tooltip and the bar overlay
  addTooltip(canvasWidth, canvasHeight);

  // add the axes
  addAxes(canvasWidth, canvasHeight, paddingLeft, paddingRight,
    paddingBot, paddingTop, xScale, yScale);
};

export default plotBarChart;
