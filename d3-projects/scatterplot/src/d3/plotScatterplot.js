
import { select } from 'd3-selection';
import { scaleTime } from 'd3-scale';
import { extent } from 'd3-array';
import addTitle from './addTitle';
import addTooltip from './addTooltip';
import addAxes from './addAxes';
import addLegend from './addLegend';
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  PADDING_TOP,
  PADDING_BOT,
  PADDING_LEFT,
  PADDING_RIGHT,
  CIRCLE_RADIUS,
  COLOR_DOPING,
  COLOR_NON_DOPING,
  COLOR_DOPING_OVERLAY,
  COLOR_NON_DOPING_OVERLAY
} from './params';


/*
 * Converts a "mm:ss" string time format into a Date object.
 */

const getDate = str => new Date("1970T00:" + str);

/*
 * Top level function to plot all of the data.
 */

const plotScatterplot = dataset => {
  addTitle();

  // x scale
  const xScale = scaleTime()
      .domain(extent(dataset, d => new Date(String(d["Year"]))))
      .range([PADDING_LEFT, CANVAS_WIDTH - PADDING_RIGHT]);

  // y scale
  const yScale = scaleTime()
      .domain(extent(dataset, d => getDate(d["Time"])))
      .range([CANVAS_HEIGHT - PADDING_BOT, PADDING_TOP]);

  // create the SVG canvas
  select('body')
    .append('div')
      .attr('id', 'svg-div')
    .append('svg')
      .attr('viewBox', `0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`);

  // plot the circles
  select('svg')
    .selectAll('circle')
    .data(dataset)
    .enter()
    .append('circle')
      .attr('cx', d => xScale(new Date(String(d["Year"]))))
      .attr('cy', d => yScale(getDate(d["Time"])))
      .attr('r', CIRCLE_RADIUS)
      .attr('fill', d => d["Doping"] !== "" ?
            COLOR_DOPING : COLOR_NON_DOPING)
      .attr('stroke', d => d["Doping"] !== "" ?
            COLOR_DOPING_OVERLAY : COLOR_NON_DOPING_OVERLAY)
      .attr('class', 'dot')
      .attr('data-xvalue', d => new Date(String(d["Year"])))
      .attr('data-yvalue', d => getDate(d["Time"]));

  // add the x and y axes
  addAxes(xScale, yScale);

  // add the legend
  addLegend();

  // add the tooltip and the overlay
  addTooltip();
};

export default plotScatterplot;
