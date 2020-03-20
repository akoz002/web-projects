/*
 * freeCodeCamp Data Visualization Certification
 * Project 2: Scatterplot
 * Alex Kozlov, 2020
 *
 * Plots a scatterplot with D3.js which presents doping allegations data 
 * in professional cycling. The data points are color-coded to differentiate 
 * between cyclists with and without doping allegations. A tooltip presents 
 * additional information about each data point. The data is fetched with 
 * AJAX.
 */

/*
 * Global parameters for the plot.
 */

// 16:9 aspect ratio
const CANVAS_WIDTH = 1600;
const CANVAS_HEIGHT = 900;
const PADDING_TOP = 200;
const PADDING_BOT = 180;
const PADDING_LEFT = 260;
const PADDING_RIGHT = 180;
const CIRCLE_RADIUS = 10;

// colors for plotting the data
const COLOR_DOPING = 'red';
const COLOR_DOPING_OVERLAY = 'lightsalmon';
const COLOR_DOPING_TOOLTIP = 'maroon';

const COLOR_NON_DOPING = 'mediumseagreen';
const COLOR_NON_DOPING_OVERLAY = 'lightgreen';
const COLOR_NON_DOPING_TOOLTIP = 'hsl(147, 50%, 25%)';

/*
 * Adds a title and sub-title to the document.
 */

const addTitle = () => {
  d3.select('body')
    .append('h1')
      .attr('id', 'title')
      .text('Doping in Professional Cycling');
  
  d3.select('body')
    .append('p')
      .attr('id', 'sub-title')
      .text("Fastest times up Alpe d'Huez");
};

/* 
 * Creates the x and y axes and axis labels.
 */

const addAxes = (xScale, yScale) => {
  // x axis
  const xAxis = d3.axisBottom(xScale)
      .tickPadding(20);
  
  d3.select('svg')
    .append('g')
      .attr('transform', `translate(0, ${CANVAS_HEIGHT - PADDING_BOT})`)
      .attr('id', 'x-axis')
      .call(xAxis);
  
  // y axis
  const yAxis = d3.axisLeft(yScale)
      .tickPadding(15)
      .tickFormat(d3.timeFormat("%M:%S"));
  
  d3.select('svg')
    .append('g')
      .attr('transform', `translate(${PADDING_LEFT}, 0)`)
      .attr('id', 'y-axis')
      .call(yAxis);
  
  // x axis label
  d3.select('svg')
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
  d3.select('svg')
    .append('text')
      .attr('id', 'y-axis-label')
      .attr('x', yOffsetLeft)
      .attr('y', yOffsetTop)
      .attr('transform', `rotate(-90 ${yOffsetLeft} ${yOffsetTop})`)
      .text('Time (min:sec)');
};

/*
 * Adds a legend to the plot.
 */

const addLegend = () => {
  // the legend box is a 2x2 grid
  d3.select('#svg-div')
    .append('div')
      .attr('id', 'legend');
  
  // first row - "non doping data" legend
  d3.select('#legend')
    .append('div')
      .attr('class', 'legend-tile')
      .style('background-color', COLOR_NON_DOPING)
      .style('border-color', COLOR_NON_DOPING_OVERLAY);
  
  d3.select('#legend')
    .append('div')
      .text('- No doping allegations');
  
  // second row - "doping data" legend
  d3.select('#legend')
    .append('div')
      .attr('class', 'legend-tile')
      .style('background-color', COLOR_DOPING)
      .style('border-color', COLOR_DOPING_OVERLAY);
  
  d3.select('#legend')
    .append('div')
      .text('- Doping allegations');
};

/*
 * Adds a tooltip and an overlay to highlight selected circle.
 */

const addTooltip = () => {
  // the tooltip box
  d3.select('#svg-div')
    .append('div')
      .attr('id', 'tooltip')
      .style('opacity', 0);
  
  // overlay to highlight selected circle
  d3.select('svg')
    .append('circle')
      .attr('id', 'overlay')
      .style('opacity', 0);
  
  // add mouse-over event handlers
  d3.selectAll('.dot')
      .on('mouseover', (d, i, nodes) => {
        const circle = nodes[i];
        const cx = Number(circle.attributes.cx.value);
        const cy = Number(circle.attributes.cy.value);
        const r = Number(circle.attributes.r.value);
        const dataXValue = circle.attributes['data-xvalue'].value;
     
        // the tooltip box
        const leftOffset = (cx / CANVAS_WIDTH * 100) - 6;
        const topOffset = (cy / CANVAS_HEIGHT * 100) - 
              (d['Doping'] !== "" ? 39 : 29);
    
        d3.select('#tooltip')
            .attr('data-year', dataXValue)
            .style('left', `${leftOffset}%`)
            .style('top', `${topOffset}%`)
            .style('background-color', d['Doping'] !== "" ? 
                   COLOR_DOPING_TOOLTIP : COLOR_NON_DOPING_TOOLTIP)
            .style('border-color', d['Doping'] !== "" ? 
                   COLOR_DOPING_OVERLAY : COLOR_NON_DOPING_OVERLAY)    
            .html(`<b>${d['Name']}</b>` + 
                  `<br>Nationality: ${d['Nationality']}` + 
                  `<br>Year: ${d['Year']}` + 
                  `<br>Time: ${d['Time']}` +
                  (d['Doping'] !== "" ? `<br><br>${d['Doping']}` : ""));
        
        // transition to fade in the tooltip
        d3.select('#tooltip')
          .transition()
            .duration(200)
            .style('opacity', 0.9);
    
        // the circle overlay
        d3.select('#overlay')
            .attr('cx', cx)
            .attr('cy', cy)
            .attr('r', r)
            .attr('fill', d['Doping'] !== "" ? 
                  COLOR_DOPING_OVERLAY : COLOR_NON_DOPING_OVERLAY)
            .style('opacity', 1);
      })
      .on('mouseout', () => {
        // fade out the tooltip and the overlay
        d3.select('#tooltip')
          .transition()
            .duration(200)
            .style('opacity', 0);
    
        d3.select('#overlay')
            .style('opacity', 0);
      });
};

/*
 * Top level function to plot all of the data.
 */

const plotScatterplot = dataset => {
  addTitle();
  
  // converts a "mm:ss" string time format into a Date object
  const getDate = str => new Date("1970T00:" + str);
  
  // x scale
  const xScale = d3.scaleTime()
      .domain(d3.extent(dataset, d => new Date(String(d["Year"]))))
      .range([PADDING_LEFT, CANVAS_WIDTH - PADDING_RIGHT]);
  
  // y scale
  const yScale = d3.scaleTime()
      .domain(d3.extent(dataset, d => getDate(d["Time"])))
      .range([CANVAS_HEIGHT - PADDING_BOT, PADDING_TOP]);
  
  // create the SVG canvas
  d3.select('body')
    .append('div')
      .attr('id', 'svg-div')
    .append('svg')
      .attr('viewBox', `0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`);
  
  // plot the circles
  d3.select('svg')
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

/*
 * Get the data and plot it.
 */

const URL = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

document.addEventListener('DOMContentLoaded', () => {
  const req = new XMLHttpRequest();
  req.open('GET', URL, true);
  req.send();
  req.onload = () => {
    const dataset = JSON.parse(req.responseText);
    plotScatterplot(dataset);
  };
});
