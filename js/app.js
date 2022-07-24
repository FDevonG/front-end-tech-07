class ChartData {
    labels = [];
    datasets = [];
    constructor (labels, sentData) {
        this.labels = labels;
        this.datasets = [{data: sentData}];
    }
}

const trafficHourlyData = new ChartData(['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'], [700, 1250, 1150, 1950, 1500, 1650, 1050, 1900, 2300, 1500, 2500],);
const trafficDailyData = new ChartData(['S', 'M', 'T', 'W', 'T', 'F', 'S'], [65, 115, 165, 80, 230, 200, 100],);
const trafficWeeklyData = new ChartData(['week 1', 'week 2', 'week 3', 'week 4', 'week 5', 'week 6'], [3500, 4000, 3600, 4300, 3200, 3600]);
const trafficMonthlyData = new ChartData(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], [15000, 21000, 17600, 18900, 21000, 25400, 18300, 15000, 16700, 24500, 21400, 19500],);
// const dailyTrafficBarData = new ChartData(['S', 'M', 'T', 'W', 'T', 'F', 'S'],[65, 115, 165, 80, 230, 200, 100],);
// const mobileData = new ChartData(['Desktop', 'Tablet', 'Phones'], [700, 245, 357],);

const trafficChart = buildChart('line', '#traffic-chart', trafficHourlyData);
const dailyChart = buildChart('bar', '#daily-traffic', new ChartData(['S', 'M', 'T', 'W', 'T', 'F', 'S'],[65, 115, 165, 80, 230, 200, 100],));
const mobileChart = buildChart('doughnut', '#mobile-users', new ChartData(['Desktop', 'Tablet', 'Phones'], [700, 245, 357],));

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
    })
}

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
})
