
import { select, selectAll } from 'd3-selection';
import { transition } from 'd3-transition';

/*
 * Converts a raw date entry ("1947-01-01") into a text
 * label in the form "1947 Q1".
 */

const getDateLabel = date => {
  const QUARTER_LABELS = {
    "01": "Q1",
    "04": "Q2",
    "07": "Q3",
    "10": "Q4"
  };

  const match = date.match(/(\d{4})-(\d{2})-01/);
  return match[1] + " " + QUARTER_LABELS[match[2]];
};

/*
 * Adds the tooltip box and a bar overlay to highlight
 * the selected bar.
 */

const addTooltip = (canvasWidth, canvasHeight) => {
  // the tooltip box
  select('main#svg-container')
    .append('div')
      .attr('id', 'tooltip')
      .style('position', 'absolute')
      .style('opacity', 0);

  // bar overlay to highlight the selected bar
  select('svg')
    .append('rect')
      .attr('id', 'bar-overlay')
      .attr('fill', 'palevioletred')
      .style('opacity', 0);

  // add 'mouseover' and 'mouseout' event handlers
  selectAll('.bar')
      .on('mouseover', (d, i, nodes) => {
        const rect = nodes[i];
        const x = Number(rect.attributes.x.value);
        const y = Number(rect.attributes.y.value);
        const width = Number(rect.attributes.width.value);
        const height = Number(rect.attributes.height.value);
        const dataDate = rect.attributes['data-date'].value;

        // the tooltip box
        const leftOffset = (x / canvasWidth * 100) - 6;
        const topOffset = (y / canvasHeight * 100) - 17;
        select('#tooltip')
            .attr('data-date', dataDate)
            .style('left', `${leftOffset}%`)
            .style('top', `${topOffset}%`)
            .html(`${getDateLabel(dataDate)}<br>$ ${d[1]} Billion`)
          .transition()
            .duration(200)
            .style('opacity', 0.9);

        // overlay to highlight the selected bar
        select('#bar-overlay')
            .attr('x', x)
            .attr('y', y)
            .attr('width', width)
            .attr('height', height)
            .style('opacity', 1);
      })
      .on('mouseout', () => {
        select('#tooltip')
          .transition()
            .duration(200)
            .style('opacity', 0);

        select('#bar-overlay')
            .style('opacity', 0);
      });
};

export default addTooltip;
