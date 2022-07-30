const primaryColor = '#7477bf';

const dataObject = {
    hourly: generateChartDataObject(['1-4', '5-8', '9-12', '13-16', '17-20', '21-24'], [700, 1250, 1150, 1950, 1500, 1650], 'line'),
    daily: generateChartDataObject(['S', 'M', 'T', 'W', 'T', 'F', 'S'], [65, 115, 165, 80, 230, 200, 100], 'line'),
    weekly: generateChartDataObject(['week 1', 'week 2', 'week 3', 'week 4', 'week 5', 'week 6'], [3500, 4000, 3600, 4300, 3200, 3600], 'line'),
    monthly: generateChartDataObject(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], [15000, 21000, 17600, 18900, 21000, 25400, 18300, 15000, 16700, 24500, 21400, 19500], 'line'),
};

const trafficCTX = '#traffic-chart';
let trafficChart = buildChart('line', trafficCTX, dataObject.hourly);

let notificationPanelOpen = false;

const emailCheckbox = document.querySelector('#email');
const profileCheckbox = document.querySelector('#profile');
const timeZoneSelect = document.querySelector('#time-zone');

const email = 'email';
const profile = 'profile';
const timeZone = 'time-zone';

const searchPanel = document.querySelector('.search__results');
const members = [
    'Victoria Chambers',
    'Dale Byrd',
    'Dawn Wood',
    'Dan Oliver',
];

buildChart('bar', '#daily-traffic', generateChartDataObject(['S', 'M', 'T', 'W', 'T', 'F', 'S'],[65, 115, 165, 80, 230, 200, 100], 'bar'));
buildChart('doughnut', '#mobile-users', generateChartDataObject(['Desktop', 'Tablet', 'Phones'], [700, 245, 357], 'doughnut'));

/**
 * calling the function below it to create a new alert box on the page
 */
 newNotification('You have unread messages');

 resetSettings();

window.onclick = (e) =>{
    if(notificationPanelOpen)
        if(!e.target.closest('.notification'))
            closeNotificationsPanel();
};

/**
 *adds and event to the search input to call the funtion to build the search results
 */
document.querySelector('#user-search').addEventListener('input', (e) => {
    searchForUser(e);
});

document.querySelector('#user-search').addEventListener('blur', (e) => {
    clearSearchResults();
});

searchPanel.addEventListener('click', (e) => {
    console.log(e.target);
    if(e.target.classList.contains('search__results--result')){
        document.querySelector('#user-search').value = e.target.textContent;
        clearSearchResults();
    }
});

/*turns the default events off the form submit event*/
document.querySelector('.message form').addEventListener('submit', (e) => {
    e.preventDefault();
});

/**
 *this removes the cnavas object for the current line graph, builds a new one with the new dta and alters the buttons styles 
 *
 */
 document.querySelector('.chart-buttons').addEventListener('mousedown', (e) =>{
    if (e.target.tagName === 'BUTTON') {
        const buttonContext = e.target.textContent;
        if (dataObject[buttonContext.toLowerCase()]){
            document.querySelector(trafficCTX).removeChild(document.querySelector(trafficCTX).firstChild);
            removeClass('.selected');
            e.target.classList.add('selected');
            trafficChart = buildChart('line', trafficCTX, dataObject[buttonContext.toLowerCase()]);
        }
    }
});

/**
 * adds functionality to the notification bell, if clicked it will open or close the notifications panel 
 */
document.querySelector('.notification a').addEventListener('click', () => {
    if(!notificationPanelOpen){
        openNotificationsPanel();
        closeNotifications();
    } else {
        closeNotificationsPanel();
    }
});

/**
 * changes the txt inside the toggles to represent on or off
 */
document.querySelector('.settings-container').addEventListener('mousedown', e => {
    if(e.target.closest('.switch')){
        changeToggleText(e.target);
    } else if (e.target.tagName === 'BUTTON'){
        if(e.target.textContent === 'Save')
            saveSettings();
        else {
            resetSettings();
        }
    }
});

/**
 * saves the settings in the local storage
 */
function saveSettings() {
    localStorage.setItem(email, emailCheckbox.checked);
    localStorage.setItem(profile, profileCheckbox.checked);
    localStorage.setItem(timeZone, timeZoneSelect.value);
}

/**
 * Sesets the setting inputs to the values saved in local storage
 */
function resetSettings(){

    if(localStorage.getItem(email)){

        let emailBool = emailCheckbox.checked;
        if(localStorage.getItem(email) === 'true')
            emailCheckbox.checked = true;
        else 
            emailCheckbox.checked = false;

        if(emailBool !== emailCheckbox.checked)
            changeToggleText(emailCheckbox);

    } else {
        let emailBool = emailCheckbox.checked;
        emailCheckbox.checked = false;
        if(emailBool !== emailCheckbox.checked)
            changeToggleText(emailCheckbox);
    }

    if(localStorage.getItem(profile)){

        let profileBool = profileCheckbox.checked;
        if(localStorage.getItem(profile) === 'true') {
            profileCheckbox.checked = true;
        } else{
            profileCheckbox.checked = false;
        }
        if(profileBool !== profileCheckbox.checked )
            changeToggleText(profileCheckbox);
    } else {
        let profileBool = profileCheckbox.checked;
        profileCheckbox.checked = false;
        if(profileBool !== profileCheckbox.checked)
            changeToggleText(profileCheckbox);
    }

    if (localStorage.getItem(timeZone)){
        timeZoneSelect.value = localStorage.getItem(timeZone);
    } else {
        timeZoneSelect.selectedIndex = 0;
    }
}

/**
 * takes a messaged that is passed to it and buileds an alert box to be displayed at the top of the page
 * 
 * @param {string} message - the message to be displayed in the alert box 
 */
function newNotification(message){
    createNewAlertBar(message);

    document.querySelector('.notification-bar').addEventListener('mousedown', (e) => {
        if(e.target.id != 'close-alert'){
            openNotificationsPanel();
            closeNotifications();
        } else {
            closeNotification();
        }
    });
    createNewNotificationInPanel(message);
}

/**
 * creates a new notification and populates the notification panel with it
 * 
 * @param {string} message - the message to be displayed in the notification 
 */
function createNewNotificationInPanel(message){

    const notificationPanel = document.querySelector('.notification-panel');
    const div = document.createElement('div');
    div.classList.add('notification-panel-message');
    div.innerHTML = `<span><a href="#">${message}</a></span><span class="notification-panel-message-xbutton">X<span>`;
    notificationPanel.appendChild(div);

    div.addEventListener('mousedown', (e) => {
        if(e.target.closest('.notification-panel-message') && !e.target.classList.contains('notification-panel-message-xbutton')){
            closeNotificationsPanel();
            removeElement(e.target.closest('.notification-panel-message'));
        } else if(e.target.classList.contains('notification-panel-message-xbutton')){
            removeElement(e.target.closest('.notification-panel-message'));
            if(!document.querySelector('.notification-panel-message'))
                closeNotificationsPanel();
        }
    });
}

/**
 * Creates a new alert box
 * 
 * @param {string} message - the message to display in the alert box
 */
function createNewAlertBar(message){
    document.querySelector('.notification-circle').classList.remove('hidden');
    const innerHTML = `<div class='notification-bar'><span><bold>Alert:</bold> ${message}</span><span id="close-alert">X</span></div>`;
    document.querySelector('.intro').insertAdjacentHTML('afterend', innerHTML);
}

/**
 * opens the panel withe the notifications
 */
function openNotificationsPanel(){
    if(!notificationPanelOpen){
        removeClassFromElement(document.querySelector('.notification-panel'), 'hidden');
        notificationPanelOpen = true;
    }
}

/**
 * closes the panel with the notifications
 */
function closeNotificationsPanel(){
    if (notificationPanelOpen) {
        addClasstoElement(document.querySelector('.notification-panel'), 'hidden');
        notificationPanelOpen = false;
    }
}

/**
 * this removes a single notification bar upon mousedowning the alert box x, 
 */
function closeNotification(){
    removeElement(document.querySelector('.notification-bar'));
    if(!document.querySelector('.notification-bar'))
        addClasstoElement(document.querySelector('.notification-circle'), 'hidden');
}

/**
 * this gets rid of multiple alert bars at the same time
 */
function closeNotifications(){
    const notificationBars = document.querySelectorAll('.notification-bar');
    for(let i = 0; i < notificationBars.length;i++){
        removeElement(notificationBars[i]);
    }
    addClasstoElement(document.querySelector('.notification-circle'), 'hidden');
}

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
    });
}

/**
 * places canvas tags inside the element with the corresponding ctx id
 * 
 * @param {string} ctx - the elements id to place the canvas into
 */
function createCanvas(ctx){
    document.querySelector(ctx).innerHTML = `<canvas></canvas>`;
}

/**
 * this method builds and returns a set of options to build the chart with
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
    };
    if (type === 'bar' || type === 'line') {
        options.plugins.legend.display = false;
    } else if (type === 'doughnut'){
        options.plugins.legend.position = 'right';
        options.plugins.legend.labels.boxWidth = 25;
        options.plugins.legend.labels.boxHeight = 15;
    }
    return options;
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
    };
    if (type === 'line'){
        chartData.datasets[0].borderColor = primaryColor;
        chartData.datasets[0].pointBorderWidth = 5;
        chartData.datasets[0].backgroundColor = 'rgba(116, 119, 191, .3)';
        chartData.datasets[0].fill = true;
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

/**
 * this removes a selected class from all objects in the dom with it
 * 
 * @param {string} className - the class to be removed 
 */
function removeClass(className){
    const items = document.querySelectorAll(className);
    for (let i = 0; i < items.length; i++)
        removeClassFromElement(items[i], 'selected');
}

/**
 * adds a class to an element
 * 
 * @param {object} element - the element to reomve the class from 
 * @param {*} className - the class to be added to the element
 */
function addClasstoElement(element, className){
    element.classList.add(className);
}

/**
 * removes a class from an element
 * 
 * @param {object} element - the element to remove the class from
 * @param {string} className - the class to add to te element
 */
function removeClassFromElement(element, className){
    element.classList.remove(className);
}

/**
 * Removes the element from the dom
 * 
 * @param {Object} $element - the item to be removed
 */
function removeElement(element){
    if(element != null)
        element.parentNode.removeChild(element);
}

/**
 * Changes the text on the toggle switches to reflect the position of the toggle. it gets all the children of the event targets parent, then finds the one containing the text and switches the text on and off
 * 
 * @param {event} element - the event passed from the event lisener 
 * @param {input} checkbox - the checkboc to compare too to see if the text should change
 */
function changeToggleText(element){
    const elements = element.closest('.switch').children;
    let toggleTexts = [];
    for (let i = 0; i < elements.length; i++){
        if (elements[i].classList.contains('toggle-text')){
            toggleTexts = elements[i].children;
        }
    }
    if(toggleTexts.length > 0){
        for (let x = 0; x < toggleTexts.length; x++){
            if(toggleTexts[x].classList.contains('hidden'))
                removeClassFromElement(toggleTexts[x], 'hidden');
            else
                addClasstoElement(toggleTexts[x], 'hidden');
        }
    }
}

/**
 * checks the search value against the names in the database and shows them in the results field
 * 
 * @param {event} e - the event object passed along from the event listener
 */
function searchForUser(e){
    const searchVal = e.target.value.trim();
    clearSearchResults();
    if (searchVal !== '') {
        removeClassFromElement(searchPanel, 'hidden');
        for (let i = 0; i < members.length; i++){
            if (members[i].toLowerCase().includes(searchVal.toLowerCase())){
                const newSpan = document.createElement('span');
                newSpan.classList.add('search__results--result');
                newSpan.textContent = members[i];
                searchPanel.appendChild(newSpan);
            }
        }
    } 
    else {
        addClasstoElement(searchPanel, 'hidden');
    }
}

/**
 * clears the search panel results of all nodes
 */
function clearSearchResults(){
    const searchResults = document.querySelectorAll('.search__results--result');
    for (let i = 0; i < searchResults.length; i++){
        removeElement(searchResults[i]);
    }
    addClasstoElement(searchPanel, 'hidden');
}
