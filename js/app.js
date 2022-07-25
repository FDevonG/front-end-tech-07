const primaryColor = '#7477bf';

const trafficHourlyData = generateChartDataObject(['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'], [700, 1250, 1150, 1950, 1500, 1650, 1050, 1900, 2300, 1500, 2500], 'line');
const trafficDailyData = generateChartDataObject(['S', 'M', 'T', 'W', 'T', 'F', 'S'], [65, 115, 165, 80, 230, 200, 100], 'line');
const trafficWeeklyData = generateChartDataObject(['week 1', 'week 2', 'week 3', 'week 4', 'week 5', 'week 6'], [3500, 4000, 3600, 4300, 3200, 3600], 'line');
const trafficMonthlyData = generateChartDataObject(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], [15000, 21000, 17600, 18900, 21000, 25400, 18300, 15000, 16700, 24500, 21400, 19500], 'line');
const dailyTrafficBarData = generateChartDataObject(['S', 'M', 'T', 'W', 'T', 'F', 'S'],[65, 115, 165, 80, 230, 200, 100], 'bar');
const mobileData = generateChartDataObject(['Desktop', 'Tablet', 'Phones'], [700, 245, 357], 'doughnut');

const trafficChart = buildChart('line', '#traffic-chart', trafficHourlyData);
const dailyChart = buildChart('bar', '#daily-traffic', dailyTrafficBarData);
const mobileChart = buildChart('doughnut', '#mobile-users', mobileData);

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
    return new Chart(document.querySelector(`${ctx}`), {
        type: `${type}`,
        data: sentData,
        options: generateChartOptions(type),
    })
}

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

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
})
