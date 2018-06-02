import calStyle from '../../css/module/calendar.css'


const calendar = require('calendar-js');


module.exports = {

    settings: {
        currMonth: 0,
        currYear: 2018
    },

    init: () => {
        //get current month date
        let d = new Date();
        module.exports.settings.currMonth = d.getMonth();
        module.exports.settings.currYear = d.getFullYear();

        module.exports.initHandlers();
    },

    initHandlers: () => {

        $('.next-month').click(function() {
                module.exports.changeMonth("forward");
        });


        $('.prev-month').click(function () {
            module.exports.changeMonth("back");

        });

    },

    changeMonth: (direction) => {

        if(module.exports.settings.currMonth === 11 && direction === "forward") {
            module.exports.settings.currMonth = -1;
            module.exports.settings.currYear++;
        }

        if(module.exports.settings.currMonth === 0 && direction === "back") {
            module.exports.settings.currMonth = 12;
            module.exports.settings.currYear--;

        }

        if(direction === "forward") {
            module.exports.settings.currMonth++;
        } else {
            module.exports.settings.currMonth--;
        }

            module.exports.renderMonth();
    },

    renderMonth: () => {
        let cal = calendar().of(module.exports.settings.currYear, module.exports.settings.currMonth)

        $('.calendar-body').empty();

        $('.cal-title-text').text(cal.month + ' - ' + cal.year);

        let calHTML = `
         <div class="row cal-row cal-header">
                                <div class="cal-1">Sun</div>
                                <div class="cal-1">Mon</div>
                                <div class="cal-1">Tue</div>
                                <div class="cal-1">Wed</div>
                                <div class="cal-1">Thu</div>
                                <div class="cal-1">Fri</div>
                                <div class="cal-1">Sat</div>
                            </div>`;

            for(var i = 0; i < cal.calendar.length; i++) {

                calHTML += `               
               <div class="row cal-row">`;

                    for(var j=0; j < 7; j++) {
                        if(cal.calendar[i][j] === 0) {
                            calHTML += `<div class="cal-1"> </div>`
                        } else {
                            calHTML += `<div class="cal-1">${cal.calendar[i][j]}</div>`
                        }
                    }
                    calHTML += `</div>`;
            }

        $('.calendar-body').append(calHTML);

    }





};


console.log(calendar().of(2016, 0));