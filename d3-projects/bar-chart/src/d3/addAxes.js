
import { select } from 'd3-selection';
import { axisBottom, axisLeft } from 'd3-axis';

/*
 * Adds the x and y axes to the chart.
 */

const addAxes = (
  canvasWidth,
  canvasHeight,
  paddingLeft,
  paddingRight,
  paddingBot,
  paddingTop,
  xScale,
  yScale
) => {
  // x axis
  const xAxis = axisBottom(xScale)
      .tickPadding(20);

  select('svg')
    .append('g')
      .attr('transform', `translate(0, ${canvasHeight - paddingBot})`)
      .attr('id', 'x-axis')
      .call(xAxis);

  // y axis
  const yAxis = axisLeft(yScale)
      .tickPadding(15);

  select('svg')
    .append('g')
      .attr('transform', `translate(${paddingLeft}, 0)`)
      .attr('id', 'y-axis')
      .call(yAxis);

  // x axis label
  const xOffsetLeft = paddingLeft +
        ((canvasWidth - paddingRight - paddingLeft) / 2);
  const xOffsetTop = canvasHeight - paddingBot * 0.27;
  select('svg')
    .append('text')
      .attr('id', 'x-label')
      .attr('x', xOffsetLeft)
      .attr('y', xOffsetTop)
      .text('Years');

  // y axis label
  const yOffsetLeft = paddingLeft * 0.4;
  const yOffsetTop = canvasHeight - paddingBot -
        ((canvasHeight - paddingTop - paddingBot) * 0.35);
  select('svg')
    .append('text')
      .attr('id', 'y-label')
      .attr('x', yOffsetLeft)
      .attr('y', yOffsetTop)
      .attr('transform', `rotate(-90 ${yOffsetLeft} ${yOffsetTop})`)
      .text('GDP (USD Billion)');
};

export default addAxes;
