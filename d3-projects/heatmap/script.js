/*
 * freeCodeCamp Data Visualization Certification
 * Project 3: Heat Map
 * Alex Kozlov, 2020
 *
 * Plots a heat map visualising global land surface temperature 
 * over months and years. Each cell shows the temperature for a 
 * given month of a given year. The temperature value is color 
 * coded using the color scale shown in the legend. Each cell also 
 * displays a tooltip showing the exact temperature value.
 */

/*
 * Global parameters for the heat map.
 */

const CANVAS_WIDTH = 1600;
const CANVAS_HEIGHT = 900;
const PADDING_LEFT = 200;
const PADDING_RIGHT = 150;
const PADDING_BOT = 150;
const PADDING_TOP = 200;

// computed parameters
const PLOT_WIDTH = CANVAS_WIDTH - PADDING_LEFT - PADDING_RIGHT;
const PLOT_HEIGHT = CANVAS_HEIGHT - PADDING_BOT - PADDING_TOP;  

/*
 * Mapping from Temperature to Hue in the HSL color model.
 */

const TEMP_HUE_MAPPING = {
  12: 20,
  11: 40,
  10: 60,
  9: 80,
  8: 100,
  7: 120,
  6: 140,
  5: 160,
  4: 180,
  3: 200,
  2: 220
};

/*
 * Gets HSL Hue from temperature value.
 */

const getHue = dataTemp => {
  // get all temperature values (keys) in reverse order
  // from largest to smallest
  const temps = Object.keys(TEMP_HUE_MAPPING).reverse();

  for (let i in temps) {
    const temp = Number(temps[i]);
    if (dataTemp >= temp) {
      return TEMP_HUE_MAPPING[temp];
    }
  }

  // data temperature is lower than the smallest value
  // return the last (smallest) temperature color
  return TEMP_HUE_MAPPING[temps[temps.length - 1]];
};

/*
 * Gets cell color from temperature value.
 */

const getCellColor = temp => `hsl(${getHue(temp)}, 100%, 50%)`;

/*
 * Gets tooltip color from temperature value.
 */

const getTooltipColor = temp => `hsl(${getHue(temp)}, 100%, 85%)`;

/*
 * Adds a title and a description.
 */

const addTitle = () => {
  d3.select('body')
    .append('h1')
      .attr('id', 'title')
      .text('Global Land-Surface Temperature');
  
  d3.select('body')
    .append('p')
      .attr('id', 'description')
      .text('1753 - 2015');
};

/*
 * Adds the axes and axis labels.
 */

const addAxes = (xScale, yScale) => {
  // x axis
  const xAxis = d3.axisBottom(xScale)
      .tickPadding(15)
      .tickSizeOuter(0)
      .tickValues(d3.ticks(
        d3.min(xScale.domain()),
        d3.max(xScale.domain()),
        10
      ));
  
  d3.select('svg')
    .append('g')
      .attr('transform', `translate(0, ${CANVAS_HEIGHT - PADDING_BOT})`)
      .attr('id', 'x-axis')
      .call(xAxis);
  
  // y axis
  const yAxis = d3.axisLeft(yScale)
      .tickPadding(15)
      .tickSizeOuter(0)
      .tickFormat(month => {
        const date = new Date(0);
        date.setUTCMonth(month);
        return d3.timeFormat("%B")(date);
      });
  
  d3.select('svg')
    .append('g')
      .attr('transform', `translate(${PADDING_LEFT}, 0)`)
      .attr('id', 'y-axis')
      .call(yAxis);
  
  // x axis label
  d3.select('svg')
    .append('text')
      .attr('id', 'x-axis-label')
      .attr('x', PADDING_LEFT + PLOT_WIDTH * 0.45)
      .attr('y', CANVAS_HEIGHT - PADDING_BOT * 0.3)
      .text('Years');
  
  // y axis label
  const yLabelLeft = PADDING_LEFT * 0.25;
  const yLabelTop = CANVAS_HEIGHT - PADDING_BOT - PLOT_HEIGHT * 0.4;
  d3.select('svg')
    .append('text')
      .attr('id', 'y-axis-label')
      .attr('x', yLabelLeft)
      .attr('y', yLabelTop)
      .attr('transform', `rotate(-90, ${yLabelLeft}, ${yLabelTop})`)
      .text('Months');
};

/*
 * Adds the legend.
 */

const addLegend = () => {
  const legendX = CANVAS_WIDTH * 0.38;
  const legendY = PADDING_TOP * 0.44;
  const legendWidth = 400;
  const legendHeight = 40;
  
  // legend x scale
  const legendScale = d3.scalePoint()
      .domain(Object.keys(TEMP_HUE_MAPPING).concat('13'))
      .range([legendX, legendX + legendWidth]);
  
  // plot the legend
  d3.select('svg')
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
  const legendAxis = d3.axisBottom(legendScale)
      .tickPadding(10)
      .tickSizeOuter(0)
      .tickValues(Object.keys(TEMP_HUE_MAPPING).slice(1));
  
  d3.select('#legend')
    .append('g')
      .attr('id', 'legend-axis')
      .attr('transform', `translate(0, ${legendY + legendHeight})`)
      .call(legendAxis);
  
  // legend title
  d3.select('#legend')
    .append('text')
      .attr('x', legendX + legendWidth * 0.35)
      .attr('y', legendY * 0.6)
      .text('Temp Scale (\u00B0C)');
};

/*
 * Adds the tooltip and cell overlay.
 */

const addTooltip = () => {
  // the tooltip box
  d3.select('#svg-div')
    .append('div')
      .attr('id', 'tooltip')
      .style('opacity', 0);
  
  // the cell overlay
  d3.select('svg')
    .append('rect')
      .attr('id', 'overlay')
      .style('opacity', 0);
  
  // add mouse-over event handlers to every cell
  d3.selectAll('.cell')
      .on('mouseover', (d, i, nodes) => {
        const cell = nodes[i];
        const x = Number(cell.attributes.x.value);
        const y = Number(cell.attributes.y.value);
        const width = Number(cell.attributes.width.value);
        const height = Number(cell.attributes.height.value);
    
        const dataMonth = cell.attributes['data-month'].value;
        const dataYear = cell.attributes['data-year'].value;
        const dataTemp = cell.attributes['data-temp'].value;

        // position the tooltip
        const tooltipX = (x / CANVAS_WIDTH * 100) - 3;
        const tooltipY = (y - 2.5 * height) / CANVAS_HEIGHT * 100;
        d3.select('#tooltip')
            .attr('data-year', dataYear)
            .style('left', `${tooltipX}%`)
            .style('top', `${tooltipY}%`)
            .style('background-color', getTooltipColor(Number(dataTemp)))
            .html(() => {
              const date = new Date(0);
              date.setUTCMonth(dataMonth);
              const monthStr = d3.timeFormat("%b")(date);
              const tempStr = d3.format(".2f")(dataTemp);
              return `${monthStr} - ${dataYear}<br>${tempStr} \u00B0C`;
            })
          .transition()
            .duration(200)
            .style('opacity', 0.95);
    
        // position the overlay
        d3.select('#overlay')
            .attr('x', x)
            .attr('y', y)
            .attr('width', width)
            .attr('height', height)
            .attr('fill', 'white')
            .style('opacity', 1);
      })
      .on('mouseout', () => {
        // fade out the tooltip and overlay
        d3.select('#tooltip')
          .transition()
            .duration(200)
            .style('opacity', 0);
    
        d3.select('#overlay')
            .style('opacity', 0);
      });
};

/*
 * Top-level function to plot the heat map.
 */

const plotHeatMap = json => {
  const baseTemp = json.baseTemperature;
  const dataset = json.monthlyVariance;
  
  // add title and description
  addTitle();
  
  // x scale
  const xExtent = d3.extent(dataset, d => d.year);
  const xScale = d3.scaleBand()
      .domain(d3.range(xExtent[0], xExtent[1] + 1))
      .range([PADDING_LEFT, CANVAS_WIDTH - PADDING_RIGHT]);
  
  // y scale
  const yScale = d3.scaleBand()
      .domain(d3.range(0, 12))
      .range([CANVAS_HEIGHT - PADDING_BOT, PADDING_TOP]);
  
  // create the SVG canvas
  d3.select('body')
    .append('div')
      .attr('id', 'svg-div')
    .append('svg')
      .attr('viewBox', `0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`);
  
  // plot the heat map
  d3.select('svg')
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

/*
 * Get the data with d3-fetch and plot it.
 */

const URL = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

document.addEventListener('DOMContentLoaded', () => {
  d3.json(URL).then(json => plotHeatMap(json));
});