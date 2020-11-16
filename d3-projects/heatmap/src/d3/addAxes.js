
import { select } from 'd3-selection';
import { axisBottom, axisLeft } from 'd3-axis';
import { timeFormat } from 'd3-time-format';
import { ticks, min, max } from 'd3-array';
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  PADDING_TOP,
  PADDING_BOT,
  PADDING_LEFT,
  PADDING_RIGHT,
  PLOT_WIDTH,
  PLOT_HEIGHT
} from './params';

/*
 * Adds the axes and axis labels.
 */

const addAxes = (xScale, yScale) => {
  // x axis
  const xAxis = axisBottom(xScale)
      .tickPadding(15)
      .tickSizeOuter(0)
      .tickValues(ticks(
        min(xScale.domain()),
        max(xScale.domain()),
        10
      ));

  select('svg')
    .append('g')
      .attr('transform', `translate(0, ${CANVAS_HEIGHT - PADDING_BOT})`)
      .attr('id', 'x-axis')
      .call(xAxis);

  // y axis
  const yAxis = axisLeft(yScale)
      .tickPadding(15)
      .tickSizeOuter(0)
      .tickFormat(month => {
        const date = new Date(0);
        date.setUTCMonth(month);
        return timeFormat("%B")(date);
      });

  select('svg')
    .append('g')
      .attr('transform', `translate(${PADDING_LEFT}, 0)`)
      .attr('id', 'y-axis')
      .call(yAxis);

  // x axis label
  select('svg')
    .append('text')
      .attr('id', 'x-axis-label')
      .attr('x', PADDING_LEFT + PLOT_WIDTH * 0.45)
      .attr('y', CANVAS_HEIGHT - PADDING_BOT * 0.3)
      .text('Years');

  // y axis label
  const yLabelLeft = PADDING_LEFT * 0.25;
  const yLabelTop = CANVAS_HEIGHT - PADDING_BOT - PLOT_HEIGHT * 0.4;
  select('svg')
    .append('text')
      .attr('id', 'y-axis-label')
      .attr('x', yLabelLeft)
      .attr('y', yLabelTop)
      .attr('transform', `rotate(-90, ${yLabelLeft}, ${yLabelTop})`)
      .text('Months');
};

export default addAxes;
