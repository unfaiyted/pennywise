import calStyle from '../../css/module/calendar.css'

const api = require('../lib/local');

const calendar = require('calendar-js');

//Constructor
function CalendarObject(settings) {
    let self = this;
    // Attach Div ID
    this.settings = settings;

    this.today();
    this.events = [];

    // Setup initial panel
    this.panel();

    // Get Events

    this.init();
    this.eventsSync();


}


CalendarObject.prototype.init = function() {
    let self = this;

    $('.next-month').click(function() {
        self.changeMonth("forward");
    });

    $('.prev-month').click(function () {
        self.changeMonth("back");

    });


    $('.cal-today-btn').click(function () {
        // Resets date
        self.today();
        self.eventsSync();

    })

};


CalendarObject.prototype.today = function () {
    let d = new Date();
    this.currMonth = d.getMonth();
    this.currYear = d.getFullYear();
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

    let matchCount = 0;
    let activeDate = this.asDate(day);
    let todayClass = (this.isDateToday(activeDate)) ? 'cal-today' : '';

    let calendarDay = `<div class="cal-big-1 ${todayClass}"><span class="day">${day}</span>`;


    this.events.forEach(function (event) {

        if(event.dueDate === activeDate) {

            if(matchCount === 0) calendarDay +=  `<ul class="event-list text-left">`;

            calendarDay += `
                <li class="event-item toggle-event" data-id="${event.bill.id}">
                             <span class="event-name text-truncate toggle-event" data-id="${event.bill.id}">
                                <span class="badge badge-${event.bill.status.color} w-100 pl-2 pb-1 text-left event-name-highlight hvr-pulse-shrink">
                                   ${event.bill.merchant.name}</span>
                             </span>                
                 </li>`;
            matchCount++;

        }

    });

    if (matchCount > 0 ) calendarDay += `</ul>`;

    calendarDay += `</div>`;
    return calendarDay;


};


CalendarObject.prototype.isDateToday = function(date) {

    let today = this.formatDate(new Date());


    return (today === date);
};

CalendarObject.prototype.formatDate = function(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
};

// could add language support later.... in theory
CalendarObject.prototype.renderMonthHeader = function(weekdays) {


    let headerHTML = `<div class="row cal-row cal-header">`;

    weekdays.forEach(function (day) {
        headerHTML += `<div class="cal-1-header text-truncate">${day}</div>`;
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

    this.eventsSync();

};

// Update the events pulling new data before refreshing calendar
CalendarObject.prototype.eventsSync = function() {
    let self = this;

    return this.loading(api.getData('calendar/events', self.asDate(1)));

};


CalendarObject.prototype.loading = function(data) {
    let self = this;

    $('.cal-loader, .cal-status').show();
    $('.calendar-body, .card-header').addClass('cal-blur');

    console.log("yes");

    data.then(
          function(d) {
              self.events = d;
              $('.cal-loader, .cal-status').hide();
              $('.calendar-body,  .card-header').removeClass('cal-blur');
                self.renderMonth();
        }, function (error) {
              $('.cal-loader, .cal-status').hide();
            console.log("Error fetching calendar data.");
        });


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

    $('.calendar-overlay').off();

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
            $('#calendar-panel').removeClass('hidden-on-load').css('z-index', -1);


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

    //$('#event-details-address').text(event.bill.merchant.address);
    $('#event-details-bill-link').attr('href', "./bill/view/"+ event.bill.id);
    //$('#event-details-city').text(event.bill.merchant.address.city);
    $('#event-details-map').text();
    $('#event-details-payment-method').text(event.bill.method.name);
    $('#event-details-state').text();
    $('#event-details-zipcode').text();

};


module.exports = CalendarObject;

