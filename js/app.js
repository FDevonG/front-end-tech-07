const primaryColor = '#7477bf';

const dataObject = {
    hourly: generateChartDataObject(['1-4', '5-8', '9-12', '13-16', '17-20', '21-24'], [700, 1250, 1150, 1950, 1500, 1650], 'line'),
    daily: generateChartDataObject(['S', 'M', 'T', 'W', 'T', 'F', 'S'], [65, 115, 165, 80, 230, 200, 100], 'line'),
    weekly: generateChartDataObject(['week 1', 'week 2', 'week 3', 'week 4', 'week 5', 'week 6'], [3500, 4000, 3600, 4300, 3200, 3600], 'line'),
    monthly: generateChartDataObject(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], [15000, 21000, 17600, 18900, 21000, 25400, 18300, 15000, 16700, 24500, 21400, 19500], 'line'),
}

const trafficCTX = '#traffic-chart';
let trafficChart = buildChart('line', trafficCTX, dataObject.hourly);
const dailyChart = buildChart('bar', '#daily-traffic', generateChartDataObject(['S', 'M', 'T', 'W', 'T', 'F', 'S'],[65, 115, 165, 80, 230, 200, 100], 'bar'));
const mobileChart = buildChart('doughnut', '#mobile-users', generateChartDataObject(['Desktop', 'Tablet', 'Phones'], [700, 245, 357], 'doughnut'));

const messageForm = document.querySelector('.message form');

/**
 * 
 * This recives the elements needed to construct and return a chart
 * 
 * @param {string} type - the type of chart we are building
 * @param {element} ctx - the context for the chart to live in
 * @param {array} sentData - the data to populate the charts with
 * @returns 
 */
function buildChart(type, ctx, sentData) {
    createCanvas(ctx);
    return new Chart(document.querySelector(`${ctx}`).firstChild, {
        type: `${type}`,
        data: sentData,
        options: generateChartOptions(type),
    })
}

function createCanvas(ctx){
    document.querySelector(ctx).innerHTML = `<canvas id='${ctx}'></canvas>`;
}

/**
 * this method build and return a set of options to build the chart with
 * 
 * @param {string} type - the type of chart being generated 
 * @returns 
 */
function generateChartOptions(type) {
    let options = {
        plugins:{
            legend:{
                labels: {

                }
            },
        },
    }
    if (type === 'bar' || type === 'line') {
        options.plugins.legend.display = false;
    } else if (type === 'doughnut'){
        options.plugins.legend.position = 'right';
        options.plugins.legend.labels.boxWidth = 25;
        options.plugins.legend.labels.boxHeight = 15;
    }
    return options
}

/**
 * This take information passed to it and build and return a chart data object
 * 
 * @param {array} labels - the labels for the chart to use
 * @param {array} data - the data to be presented on the chart
 * @param {string} type - the type of chart this is going to be
 * @returns 
 */
function generateChartDataObject(labels, data, type){
    const chartData = {
        labels: labels,
        datasets: [{
            data: data,
        }]
    }
    if (type === 'line'){
        chartData.datasets[0].borderColor = primaryColor;
        chartData.datasets[0].pointBorderWidth = 5;
        chartData.datasets[0].backgroundColor = 'rgba(116, 119, 191, 50%)';
    }
    else if(type === 'bar') {
        chartData.datasets[0].backgroundColor = primaryColor;
    }
    else if(type ==='doughnut'){
        chartData.datasets[0].backgroundColor = [
            primaryColor,
            '#81c98f',
            '#51b6c8',
        ];
    }
    return chartData;
}

document.querySelector('.chart-buttons').addEventListener('click', (e) =>{
    if (e.target.tagName === 'BUTTON') {
        const buttonContext = e.target.textContent;
        if (dataObject[buttonContext.toLowerCase()]){
            document.querySelector(trafficCTX).removeChild(document.querySelector(trafficCTX).firstChild);
            removeClass('.selected');
            e.target.classList.add('selected');
            trafficChart = buildChart('line', trafficCTX, dataObject[buttonContext.toLowerCase()]);
        }
        
    }
})

function removeClass(className){
    const items = document.querySelectorAll(className);
    for (let i = 0; i < items.length; i++){
        items[i].classList.remove('selected');
    }
}

/**
 * Removes the element from the dom
 * 
 * @param {Object} $element - the item to be removed
 */
function removeElement(element){
    element.parentNode.removeChild(element);
}

/*turns the default events off the form submit event*/
messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
})
