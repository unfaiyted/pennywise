import calStyle from '../../css/module/calendar.css'

const api = require('../lib/local');

const calendar = require('calendar-js');

//Constructor
function CalendarObject(settings) {
    let self = this;
    // Attach Div ID
    let d = new Date();

    this.settings = settings;
    this.currMonth = d.getMonth();
    this.currYear = d.getFullYear();
    this.events = [];

    // Get Events
    api.getData('calendar/events').then(
        function(valid) {
            self.events = valid;
         self.init();
         self.renderMonth();
    }, function (error) {
        console.log("Error fetching calendar data.");
    });

}

CalendarObject.prototype.init = function() {
    let self = this;

    $('.next-month').click(function() {
        self.changeMonth("forward");
    });

    $('.prev-month').click(function () {
        self.changeMonth("back");

    });

};

CalendarObject.prototype.renderMonth = function () {
    let self = this;

    let cal = calendar().of(self.currYear, self.currMonth);


    $('.event-item, .event-item').off();
    $('.calendar-body').empty();
    $('.cal-title-text').text(cal.month + ' - ' + cal.year);

    let calHTML = self.renderMonthHeader(cal.weekdaysAbbr);

    for(var i = 0; i < cal.calendar.length; i++) {

        calHTML += `<div class="row cal-row">`;

        for(var j=0; j < 7; j++) {
            if(cal.calendar[i][j] === 0) {
                calHTML += `<div class="cal-big-1"> </div>`
            } else {
                calHTML += self.createDay(cal.calendar[i][j]);
            }
        }
        calHTML += `</div>`;
    }

    $('.calendar-body').append(calHTML);

    $('.cal-popover').popover({
        container: 'body'
    });


    $('.event-item, .event-name').click(function () {
        self.updatePanel($(this).attr("data-id"));

    });




    this.panel();


};

CalendarObject.prototype.createDay = function(day) {
    // Checks if event are in event list

    let activeDate = this.asDate(day);

    let matchCount = 0;
    let calendarDay = `<div class="cal-big-1"><span class="day">${day}</span>`;


    this.events.forEach(function (event) {

        if(event.dueDate === activeDate) {
            console.log(event.bill.merchant.name);

            if(matchCount === 0) calendarDay +=  `<ul class="event-list text-left">`;

            calendarDay += `<li class="event-item toggle-event" data-id="${event.bill.id}">
                             <span class="event-name text-truncate toggle-event" data-id="${event.bill.id}">
${event.bill.merchant.name}
<span class="badge badge-${event.bill.status.color}">${event.bill.status.name}</span>
</span>                
                             </li>`;
            matchCount++;

        }

    });

    if (matchCount > 0 ) calendarDay += `</ul>`;

    calendarDay += `</div>`;
    return calendarDay;


};


// could add language support later.... in theory
CalendarObject.prototype.renderMonthHeader = function(weekdays) {

    console.log(weekdays);

    let headerHTML = `<div class="row cal-row cal-header">`;

    weekdays.forEach(function (day) {
        headerHTML += `<div class="cal-1 text-truncate">${day}</div>`;
        });

        headerHTML += `</div>`;

    return headerHTML;

};

CalendarObject.prototype.changeMonth = function(direction) {
    let self = this;

    if(self.currMonth === 11 && direction === "forward") {
        self.currMonth = -1;
        self.currYear++;
    }

    if(self.currMonth === 0 && direction === "back") {
        self.currMonth = 12;
        self.currYear--;
    }

    if(direction === "forward") {
        self.currMonth++;
    } else {
        self.currMonth--;
    }

    this.eventsSync().then(
    function(data) {
        self.events = data;
        self.renderMonth();
    }, function (error) {
        console.log("Error fetching calendar data.");
    });


};

// Update the events pulling new data before refreshing calendar
CalendarObject.prototype.eventsSync = function() {
    let self = this;

    // switch this to pass month and post request

        return api.getData('calendar/events', this.asDate(1));
};


CalendarObject.prototype.asDate = function(day) {

    if(day < 10) {
        day = "0" + day;
    }

    // starts at zero offset
    let month = this.currMonth+1;
    if (month < 10) {
        month = "0" + month;
    }

    let d = this.currYear + "-" +
        month + "-"+ day;

    return d;
};


CalendarObject.prototype.panel = function () {
    let self = this;

    var panelEvent = $('#calendar-panel').scotchPanel({
        containerSelector: '#calendar', // Make this appear on the entire screen
        direction: 'right', // Make it toggle in from the left
        duration: 550, // Speed in ms how fast you want it to be
        transition: 'ease-in-out', // CSS3 transition type: linear, ease, ease-in, ease-out, ease-in-out, cubic-bezier(P1x,P1y,P2x,P2y)
        clickSelector: '.toggle-event', // Enables toggling when clicking elements of this class
        distanceX: '400px', // Size fo the toggle
        beforePanelOpen: function() {
            // Reset all panels
            $('.scotch-panel').css('z-index', 0);
            // Bring current panel to top
            $('#calendar-panel').css('z-index', -1);


        },
        enableEscapeKey: true // Clicking Esc will close the panel
    });

    $('.calendar-overlay').click(function() {
        // CLOSE ONLY
        panelEvent.close();
    })

};


CalendarObject.prototype.getBillEvent = function (id) {
    let foundEvent = null;

    this.events.forEach(function (event) {
        if(parseInt(id) === event.bill.id) return foundEvent = event;
    });

    return foundEvent;
};


CalendarObject.prototype.updatePanel = function (id) {

   let event = this.getBillEvent(id);

   $('#panel-event-name').text(event.bill.merchant.name);

};


module.exports = CalendarObject;

