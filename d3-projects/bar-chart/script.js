/*
 * freeCodeCamp Data Visualization Certification
 * Project 1: Bar Chart
 * Alex Kozlov, 2020
 *
 * Uses the D3.js library to plot a bar chart of US GDP data over time.
 * On mouse-over the given bar is highlighted and a tooltip is displayed.
 * The chart resizes responsively. The data for plotting is fetched in 
 * JSON format via AJAX.
 */

/*
 * Adds an <h1> title to the document.
 */

const addTitle = () => {
  d3.select('body')
    .append('h1')
      .text('United States GDP')
      .attr('id', 'title');
};

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
  d3.select('#svg-div')
    .append('div')
      .attr('id', 'tooltip')
      .style('position', 'absolute')
      .style('opacity', 0);
  
  // bar overlay to highlight the selected bar
  d3.select('svg')
    .append('rect')
      .attr('id', 'bar-overlay')
      .attr('fill', 'palevioletred')
      .style('opacity', 0);
  
  // add 'mouseover' and 'mouseout' event handlers
  d3.selectAll('.bar')
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
        d3.select('#tooltip')
            .attr('data-date', dataDate)
            .style('left', `${leftOffset}%`)
            .style('top', `${topOffset}%`)
            .html(`${getDateLabel(dataDate)}<br>$ ${d[1]} Billion`)
          .transition()
            .duration(200)
            .style('opacity', 0.9);
      
        // overlay to highlight the selected bar
        d3.select('#bar-overlay')
            .attr('x', x)
            .attr('y', y)
            .attr('width', width)
            .attr('height', height)
            .style('opacity', 1);
      })
      .on('mouseout', () => {
        d3.select('#tooltip')
          .transition()
            .duration(200)
            .style('opacity', 0);
    
        d3.select('#bar-overlay')
            .style('opacity', 0);
      });
};

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
  const xAxis = d3.axisBottom(xScale)
      .tickPadding(20);
  
  d3.select('svg')
    .append('g')
      .attr('transform', `translate(0, ${canvasHeight - paddingBot})`)
      .attr('id', 'x-axis')
      .call(xAxis);
  
  // y axis
  const yAxis = d3.axisLeft(yScale)
      .tickPadding(15);
  
  d3.select('svg')
    .append('g')
      .attr('transform', `translate(${paddingLeft}, 0)`)
      .attr('id', 'y-axis')
      .call(yAxis);
  
  // x axis label
  const xOffsetLeft = paddingLeft + 
        ((canvasWidth - paddingRight - paddingLeft) / 2);
  const xOffsetTop = canvasHeight - paddingBot * 0.27;
  d3.select('svg')
    .append('text')
      .attr('id', 'x-label')
      .attr('x', xOffsetLeft)
      .attr('y', xOffsetTop)
      .text('Years');
  
  // y axis label
  const yOffsetLeft = paddingLeft * 0.4;
  const yOffsetTop = canvasHeight - paddingBot - 
        ((canvasHeight - paddingTop - paddingBot) * 0.35);
  d3.select('svg')
    .append('text')
      .attr('id', 'y-label')
      .attr('x', yOffsetLeft)
      .attr('y', yOffsetTop)
      .attr('transform', `rotate(-90 ${yOffsetLeft} ${yOffsetTop})`)
      .text('GDP (USD Billion)');
};
 
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
  const xScale = d3.scaleTime()
      .domain(d3.extent(dataset, d => new Date(d[0])))
      .range([paddingLeft, canvasWidth - paddingRight]);

  const yScale = d3.scaleLinear()
      .domain([0, d3.max(dataset, d => d[1])])
      .range([canvasHeight - paddingBot, paddingTop]);

  // create the SVG canvas
  d3.select('body')
    .append('div')
      .attr('id', 'svg-div')
      .style('position', 'relative')
    .append('svg')
      .attr("viewBox", `0 0 ${canvasWidth} ${canvasHeight}`);
  
  // plot the bars
  d3.select('svg')
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

/*
 * Fetch the data with AJAX and plot it.
 */

const data_url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

document.addEventListener('DOMContentLoaded', () => {
  fetch(data_url)
    .then(response => response.json())
    .then(json => plotBarChart(json.data));
});
