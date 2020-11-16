
import { select } from 'd3-selection';
import { axisBottom, axisLeft } from 'd3-axis';
import { timeFormat } from 'd3-time-format';
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  PADDING_TOP,
  PADDING_BOT,
  PADDING_LEFT,
  PADDING_RIGHT
} from './params';

/*
 * Creates the x and y axes and axis labels.
 */

const addAxes = (xScale, yScale) => {
  // x axis
  const xAxis = axisBottom(xScale)
      .tickPadding(20);

  select('svg')
    .append('g')
      .attr('transform', `translate(0, ${CANVAS_HEIGHT - PADDING_BOT})`)
      .attr('id', 'x-axis')
      .call(xAxis);

  // y axis
  const yAxis = axisLeft(yScale)
      .tickPadding(15)
      .tickFormat(timeFormat("%M:%S"));

  select('svg')
    .append('g')
      .attr('transform', `translate(${PADDING_LEFT}, 0)`)
      .attr('id', 'y-axis')
      .call(yAxis);

  // x axis label
  select('svg')
    .append('text')
      .attr('id', 'x-axis-label')
      .attr('x', PADDING_LEFT +
            (CANVAS_WIDTH - PADDING_LEFT - PADDING_RIGHT) * 0.5)
      .attr('y', CANVAS_HEIGHT - PADDING_BOT * 0.27)
      .text('Year');

  // y axis label
  const yOffsetLeft = PADDING_LEFT * 0.4;
  const yOffsetTop = CANVAS_HEIGHT - PADDING_BOT -
        (CANVAS_HEIGHT - PADDING_TOP - PADDING_BOT) * 0.3;
  select('svg')
    .append('text')
      .attr('id', 'y-axis-label')
      .attr('x', yOffsetLeft)
      .attr('y', yOffsetTop)
      .attr('transform', `rotate(-90 ${yOffsetLeft} ${yOffsetTop})`)
      .text('Time (min:sec)');
};

export default addAxes;
