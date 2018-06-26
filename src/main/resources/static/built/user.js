/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 170);
/******/ })
/************************************************************************/
/******/ ({

/***/ 136:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(137);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(4)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!./calendar.css", function() {
		var newContent = require("!!../../../../../../node_modules/css-loader/index.js!./calendar.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 137:
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(138);
exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "\n.cal-loader {\n    top:0;\n    left:0;\n    right:0;\n    bottom:0;\n    width: 100%;\n    height: 100%;\n    position: fixed;\n    background-color: rgba(29, 27, 27, 0.12); /* change if the mask should have another color then white */\n    z-index:99999999; /* makes sure it stays on top */\n    -webkit-border-radius: 10px;\n    -moz-border-radius: 10px;\n    border-radius: 10px;\n\n}\n\n\n.cal-status {\n    width:300px;\n    height:300px;\n    position:absolute;\n    left:50%; /* centers the loading animation horizontally one the screen */\n    top:50%; /* centers the loading animation vertically one the screen */\n    background-image:url(" + escape(__webpack_require__(139)) + "); /* path to your loading animation */\n    background-repeat:no-repeat;\n    background-position:center;\n    margin:-150px 0 0 -150px; /* is width and height divided by two */\n}\n\n\n.cal-blur {\n    -webkit--filter: blur(4px);\n    filter: blur(4px);\n}\n\n\n\n\n.cal-1 {\n    width: 14.281%;\n    border-right: 1px solid #c6c2c6;\n    border-top: 1px solid #d6d2d6;\n    text-align: right;\n    height: 35px;\n    line-height: 3;\n    padding-right: 9px;\n}\n\n.cal-1:hover {\n    background-color: #ececec;\n}\n\n.cal-row .cal-1:last-child, .cal-row .cal-1-header:last-child  {\n    border-right: 0;\n}\n\n\n.cal-1-header {\n    width: 14.281%;\n    border-right: 1px solid #c6c2c6;\n    border-top: 1px solid #d6d2d6;\n    text-align: right;\n    height: 35px;\n    line-height: 3;\n    padding-right: 9px;\n    border-bottom:  2px solid #c6c2c6;\n    text-align: center;\n}\n\n\n\n.next-month, .prev-month {\n    cursor: pointer;\n}\n\n.next-month:hover, .prev-month:hover {\n    cursor: pointer;\n    color: #00B4DB;\n}\n.cal-title {\n    font-weight: bold;\n}\n\n\n.cal-title-text {\n\n    font-size: 20px;\n}\n.cal-header {\n   background-color: #eaecef;\n    padding: 0;\n    font-weight: bold;\n\n}\n\n\n.calendar-body {\n    margin-left:15px;\n    margin-right:15px;\n}\n\n.calendar-body .cal-row:last-child {\n    border-bottom: 0;\n}\n\n.cal-due-date {\n    cursor: pointer;\n    color: #db3b42;\n    font-weight: bold;\n    background-color: #2312120f;\n}\n\n.cal-today {\n    font-weight: bold;\n    background: rgb(246, 252, 255)\n}\n\n.cal-today-btn {\n    margin-bottom: 7px;\n    margin-left: 11px;\n}\n\n\n/* BIG CALENDAR */\n\n.calendar-container {\n    width: 100%;\n    height: 100vh;\n    padding-left: 6%;\n\n}\n\n#calendar {\n    box-shadow: 0 9px 23px rgba(0, 0, 0, 0.09), 0 5px 5px rgba(0, 0, 0, 0.06) !important;\n    -webkit-transition: box-shadow 0.7s cubic-bezier(0.25, 0.8, 0.25, 1) !important;\n    -moz-transition: box-shadow 0.7s cubic-bezier(0.25, 0.8, 0.25, 1) !important;\n    -o-transition: box-shadow 0.7s cubic-bezier(0.25, 0.8, 0.25, 1) !important;\n    transition: box-shadow 0.7s cubic-bezier(0.25, 0.8, 0.25, 1) !important;\n    -webkit-border-radius: 0.4167rem;\n    -moz-border-radius: 0.4167rem;\n    -ms-border-radius: 0.4167rem;\n    -o-border-radius: 0.4167rem;\n    border-radius: 0.4167rem;\n\n    padding:0;\n    margin:0;\n\n}\n\n\n\n.cal-big-1 {\n    width: 14.281%;\n    position: relative;\n    border-right: 1px solid #ebe6eb;\n    border-top: 1px solid #ebe6eb;\n    text-align: right;\n    line-height: 3;\n    padding-right: 9px;\n    overflow: hidden;\n}\n\n.cal-big-1:after {\n    content: \"\";\n    display: block;\n    padding-bottom: 48%;\n}\n\n.cal-big-1:hover {\n    background-color: #ececec;\n}\n\n.cal-row .cal-big-1:last-child {\n    border-right: 0;\n}\n\n\n.event-list li {\n    list-style-type: none;\n}\n\n/*.event-list li:before {*/\n    /*font-family: Font Awesome\\ 5 Free;*/\n    /*font-weight: 900;*/\n    /*-webkit-font-smoothing: antialiased;*/\n    /*text-rendering: auto;*/\n    /*content: '\\f4c0';*/\n    /*margin:-20px 5px 0 -15px;*/\n    /*color: #102911;*/\n    /*position: relative;*/\n    /*top: 10px*/\n\n/*}*/\n\n\n.event-list {\n    line-height: 1.3;\n    padding-left:5px;\n    height: 0;\n    position: relative;\n    top: -10px\n}\n\n.event-item {\n    cursor: pointer;\n}\n\n.event-name-highlight:hover {\n\n}\n\n.event-details-header {\n    background-color: #dcdcdc;\n    border-bottom: 2px solid #e0e0e0;\n    position: relative;\n    top: -16px;\n    left: -31px;\n    padding: 10px;\n    width: calc(100% + 50px);\n}\n\n.event-details-title {\n    font-weight: bold;\n}\n\n\n.event-details-body {\n    background-color: #eaeaea;\n    position: relative;\n    left: -31px;\n    top: -16px;\n    width: calc(100% + 62px);\n\n\n}\n\n.event-details-footer {\n    background-color: #dcdcdc;\n    border-bottom: 2px solid #e0e0e0;\n    position: relative;\n    padding: 10px;\n    padding-left: 20px;\n    border-bottom-right-radius: 10px;\n    left: -31px;\n    top: -16px;\n    width: calc(100% + 62px);\n}\n\n#calendar-panel {\n    background-color: transparent;\n    border-radius: 10px;\n}\n\n\n\n.calendar-overlay {\n    position: fixed;\n\n    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#000000+0,000000+100&0.65+0,0+100;Neutral+Density */\n    background: -moz-linear-gradient(left, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 100%); /* FF3.6-15 */\n    background: -webkit-linear-gradient(left, rgba(0,0,0,0.65) 0%,rgba(0,0,0,0) 100%); /* Chrome10-25,Safari5.1-6 */\n    background: linear-gradient(to right, rgba(0,0,0,0.65) 0%,rgba(0,0,0,0) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#a6000000', endColorstr='#00000000',GradientType=1 ); /* IE6-9 */\n\n    width: 100%;\n    height: 100%;\n    display: none;\n    z-index: 999999;\n    -webkit-transition: all 225ms ease;\n    -moz-transition: all 225ms ease;\n    transition: all 225ms ease;\n\n    -webkit-animation-duration: 1s;\n    animation-duration: 1s;\n    -webkit-animation-fill-mode: both;\n    animation-fill-mode: both;\n    border-radius: 10px;\n\n    -webkit-animation-name: fadeIn;\n    animation-name: fadeIn;\n    cursor: pointer;\n}\n.scotch-is-showing .calendar-overlay {\n    display: block;\n}\n\n\n\n@-webkit-keyframes fadeIn {\n    0% {\n        opacity: 0;\n    }\n\n    100% {\n        opacity: 1;\n    }\n}\n\n@keyframes fadeIn {\n    0% {\n        opacity: 0;\n    }\n\n    100% {\n        opacity: 1;\n    }\n}\n\n", ""]);

// exports


/***/ }),

/***/ 138:
/***/ (function(module, exports) {

module.exports = function escape(url) {
    if (typeof url !== 'string') {
        return url
    }
    // If url is already wrapped in quotes, remove them
    if (/^['"].*['"]$/.test(url)) {
        url = url.slice(1, -1);
    }
    // Should url be wrapped?
    // See https://drafts.csswg.org/css-values-3/#urls
    if (/["'() \t\n]/.test(url)) {
        return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"'
    }

    return url
}


/***/ }),

/***/ 139:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwcHgiICBoZWlnaHQ9IjIwMHB4IiAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiIGNsYXNzPSJsZHMtcmlwcGxlIiBzdHlsZT0iYmFja2dyb3VuZDogbm9uZTsiPjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjEzLjY0NDIiIGZpbGw9Im5vbmUiIG5nLWF0dHItc3Ryb2tlPSJ7e2NvbmZpZy5jMX19IiBuZy1hdHRyLXN0cm9rZS13aWR0aD0ie3tjb25maWcud2lkdGh9fSIgc3Ryb2tlPSIjOGNkMGU1IiBzdHJva2Utd2lkdGg9IjIiPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIGNhbGNNb2RlPSJzcGxpbmUiIHZhbHVlcz0iMDs0MCIga2V5VGltZXM9IjA7MSIgZHVyPSIxLjYiIGtleVNwbGluZXM9IjAgMC4yIDAuOCAxIiBiZWdpbj0iLTAuOHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGU+PGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIgY2FsY01vZGU9InNwbGluZSIgdmFsdWVzPSIxOzAiIGtleVRpbWVzPSIwOzEiIGR1cj0iMS42IiBrZXlTcGxpbmVzPSIwLjIgMCAwLjggMSIgYmVnaW49Ii0wLjhzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjMzLjIyMjgiIGZpbGw9Im5vbmUiIG5nLWF0dHItc3Ryb2tlPSJ7e2NvbmZpZy5jMn19IiBuZy1hdHRyLXN0cm9rZS13aWR0aD0ie3tjb25maWcud2lkdGh9fSIgc3Ryb2tlPSIjMzc2ODg4IiBzdHJva2Utd2lkdGg9IjIiPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIGNhbGNNb2RlPSJzcGxpbmUiIHZhbHVlcz0iMDs0MCIga2V5VGltZXM9IjA7MSIgZHVyPSIxLjYiIGtleVNwbGluZXM9IjAgMC4yIDAuOCAxIiBiZWdpbj0iMHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGU+PGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIgY2FsY01vZGU9InNwbGluZSIgdmFsdWVzPSIxOzAiIGtleVRpbWVzPSIwOzEiIGR1cj0iMS42IiBrZXlTcGxpbmVzPSIwLjIgMCAwLjggMSIgYmVnaW49IjBzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlPjwvY2lyY2xlPjwvc3ZnPg=="

/***/ }),

/***/ 140:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var InvalidMonthError = __webpack_require__(141);
var InvalidMonthsError = __webpack_require__(142);
var InvalidMonthsAbbrError = __webpack_require__(143);

var InvalidWeekdayError = __webpack_require__(144);
var InvalidWeekdaysError = __webpack_require__(145);
var InvalidWeekdaysAbbrError = __webpack_require__(146);

var MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

var WEEKDAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

function generateAbbr(arr, len) {
  return arr.map(function(item) {
    return item.slice(0, len || 3);
  });
}

function createArray(length) {
  var a = [];

  for (var i = 0; i < length; i++) {
    a.push(1);
  }

  return a;
}

function calendar(config) {
  var abbrLengthWeek =
    config && !isNaN(config.abbrWeek) && config.abbrWeek > 0
      ? config.abbrWeek
      : 3;
  var abbrLengthMonth =
    config && !isNaN(config.abbrMonth) && config.abbrMonth > 0
      ? config.abbrMonth
      : 3;

  var _months = MONTHS;
  var _monthsAbbr = generateAbbr(MONTHS, abbrLengthMonth);
  var _weekdays = WEEKDAYS;
  var _weekdaysAbbr = generateAbbr(WEEKDAYS, abbrLengthWeek);

  if (config && config.months) {
    if (!Array.isArray(config.months) || config.months.length !== 12) {
      throw new InvalidMonthsError('Months array must have 12 values');
    }

    _months = config.months;
    _monthsAbbr = generateAbbr(config.months, abbrLengthMonth);
  }

  if (config && config.monthsAbbr) {
    if (!Array.isArray(config.monthsAbbr) || config.monthsAbbr.length !== 12) {
      throw new InvalidMonthsAbbrError('Months array must have 12 values');
    }

    _monthsAbbr = config.monthsAbbr;
  }

  if (config && config.weekdays) {
    if (!Array.isArray(config.weekdays) || config.weekdays.length !== 7) {
      throw new InvalidWeekdaysError('Weekdays array must have 7 values');
    }

    _weekdays = config.weekdays;
    _weekdaysAbbr = generateAbbr(config.weekdays, abbrLengthWeek);
  }

  if (config && config.weekdaysAbbr) {
    if (
      !Array.isArray(config.weekdaysAbbr) ||
      config.weekdaysAbbr.length !== 7
    ) {
      throw new InvalidWeekdaysAbbrError('Weekdays array must have 7 values');
    }

    _weekdaysAbbr = config.weekdaysAbbr;
  }

  return {
    months: function() {
      return _months;
    },

    monthsAbbr: function() {
      return _monthsAbbr;
    },

    years: function(from, to) {
      if (from > to) {
        throw new RangeError(
          'The first year argument cannot be greater than the second'
        );
      }

      var years = [from.toString()];
      var totalYears = to - from + 1;

      while (years.length < totalYears) {
        var year = parseInt(years[years.length - 1], 10) + 1;

        years.push(year.toString());
      }

      return years;
    },

    yearsAbbr: function(from, to) {
      var years = this.years(from, to).map(function(year) {
        return year.toString().substring(2);
      });

      return years.length > 1 ? years : years[0];
    },

    weekdays: function() {
      return _weekdays;
    },

    weekdaysAbbr: function() {
      return _weekdaysAbbr;
    },

    generateCalendar: function(
      year,
      month,
      numberOfDays,
      firstWeekday,
      lastWeekday,
      dayTransformer,
      cbData
    ) {
      var calendar = [];
      var totalWeeks = Math.ceil((numberOfDays + firstWeekday) / 7);
      var totalDaysOnWeek = 7;
      var lastWeek = totalWeeks - 1;
      var execCb = typeof dayTransformer === 'function';

      var lastDay = firstWeekday * -1;
      var weeks = [];

      createArray(totalWeeks).forEach(function(_, week) {
        createArray(totalDaysOnWeek).forEach(function(_, day) {
          lastDay++;

          var date = new Date(year, month, lastDay);

          var data = {
            date: date,
            day: date.getDate(),
            isInPrimaryMonth: date.getMonth() === month,
            isInLastWeekOfPrimaryMonth: week === lastWeek,
            index: {
              day: day,
              week: week,
            },
          };

          if (execCb) {
            var result = dayTransformer(data, cbData);

            if (result !== undefined) {
              data = result;
            }
          }

          weeks.push(data);
        });

        calendar.push(weeks);

        weeks = [];
      });

      return calendar;
    },

    of: function(year, month, transformer) {
      var data = this.detailed(year, month, function(data) {
        return data.isInPrimaryMonth ? data.day : 0;
      });

      if (typeof transformer === 'function') {
        return transformer(data);
      }

      return data;
    },

    detailed: function(year, month, dayTransformer) {
      if (month < 0 || month > 11) {
        throw new InvalidMonthError('Month should be beetwen 0 and 11');
      }

      if (typeof year !== 'number' || typeof month !== 'number') {
        throw new Error('Arguments should be numbers');
      }

      var numberOfDays = new Date(year, month + 1, 0).getDate();
      var firstWeekday = new Date(year, month, 1).getDay();
      var lastWeekday = new Date(year, month, numberOfDays).getDay();

      var data = {
        year: year.toString(),
        yearAbbr: this.yearsAbbr(year),
        month: this.months()[month],
        monthAbbr: this.monthsAbbr()[month],
        weekdays: this.weekdays(),
        weekdaysAbbr: this.weekdaysAbbr(),
        days: numberOfDays,
        firstWeekday: firstWeekday,
        lastWeekday: lastWeekday,
      };

      var calendar = this.generateCalendar(
        year,
        month,
        numberOfDays,
        firstWeekday,
        lastWeekday,
        dayTransformer,
        data
      );

      data.calendar = calendar;

      return data;
    },

    validate: function(year, month, day) {
      var date = new Date(year, month, day);

      return (
        date.getFullYear() === year &&
        date.getMonth() === month &&
        date.getDate() === day
      );
    },
  };
}

module.exports = calendar;


/***/ }),

/***/ 141:
/***/ (function(module, exports) {

module.exports = function InvalidMonthError(message) {
  this.message = message;
  this.name = 'InvalidMonthError';
};


/***/ }),

/***/ 142:
/***/ (function(module, exports) {

module.exports = function InvalidMonthsError(message) {
  this.message = message;
  this.name = 'InvalidMonthsError';
};


/***/ }),

/***/ 143:
/***/ (function(module, exports) {

module.exports = function InvalidMonthsAbbrError(message) {
  this.message = message;
  this.name = 'InvalidMonthsAbbrError';
};


/***/ }),

/***/ 144:
/***/ (function(module, exports) {

module.exports = function InvalidMonthError(message) {
  this.message = message;
  this.name = 'InvalidWeekdayError';
};


/***/ }),

/***/ 145:
/***/ (function(module, exports) {

module.exports = function InvalidMonthsError(message) {
  this.message = message;
  this.name = 'InvalidWeekdaysError';
};


/***/ }),

/***/ 146:
/***/ (function(module, exports) {

module.exports = function InvalidMonthsAbbrError(message) {
  this.message = message;
  this.name = 'InvalidWeekdaysAbbrError';
};


/***/ }),

/***/ 170:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Calendar = __webpack_require__(171);
if ($("#calendar")[0]) {
    // Do something if class exists


    var cal = new Calendar();
}

/***/ }),

/***/ 171:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _calendar = __webpack_require__(136);

var _calendar2 = _interopRequireDefault(_calendar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = __webpack_require__(5);

var calendar = __webpack_require__(140);

//Constructor
function CalendarObject(settings) {
    var self = this;
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

CalendarObject.prototype.init = function () {
    var self = this;

    $('.next-month').click(function () {
        self.changeMonth("forward");
    });

    $('.prev-month').click(function () {
        self.changeMonth("back");
    });

    $('.cal-today-btn').click(function () {
        // Resets date
        self.today();
        self.eventsSync();
    });
};

CalendarObject.prototype.today = function () {
    var d = new Date();
    this.currMonth = d.getMonth();
    this.currYear = d.getFullYear();
};

CalendarObject.prototype.renderMonth = function () {
    var self = this;

    var cal = calendar().of(self.currYear, self.currMonth);

    $('.event-item, .event-item').off();
    $('.calendar-body').empty();
    $('.cal-title-text').text(cal.month + ' - ' + cal.year);

    var calHTML = self.renderMonthHeader(cal.weekdaysAbbr);

    for (var i = 0; i < cal.calendar.length; i++) {

        calHTML += '<div class="row cal-row">';

        for (var j = 0; j < 7; j++) {
            if (cal.calendar[i][j] === 0) {
                calHTML += '<div class="cal-big-1"> </div>';
            } else {
                calHTML += self.createDay(cal.calendar[i][j]);
            }
        }
        calHTML += '</div>';
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

CalendarObject.prototype.createDay = function (day) {
    // Checks if event are in event list

    var matchCount = 0;
    var activeDate = this.asDate(day);
    var todayClass = this.isDateToday(activeDate) ? 'cal-today' : '';

    var calendarDay = '<div class="cal-big-1 ' + todayClass + '"><span class="day">' + day + '</span>';

    this.events.forEach(function (event) {

        if (event.dueDate === activeDate) {

            if (matchCount === 0) calendarDay += '<ul class="event-list text-left">';

            calendarDay += '\n                <li class="event-item toggle-event" data-id="' + event.bill.id + '">\n                             <span class="event-name text-truncate toggle-event" data-id="' + event.bill.id + '">\n                                <span class="badge badge-' + event.bill.status.color + ' w-100 pl-2 pb-1 text-left event-name-highlight hvr-pulse-shrink">\n                                   ' + event.bill.merchant.name + '</span>\n                             </span>                \n                 </li>';
            matchCount++;
        }
    });

    if (matchCount > 0) calendarDay += '</ul>';

    calendarDay += '</div>';
    return calendarDay;
};

CalendarObject.prototype.isDateToday = function (date) {

    var today = this.formatDate(new Date());

    return today === date;
};

CalendarObject.prototype.formatDate = function (date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
};

// could add language support later.... in theory
CalendarObject.prototype.renderMonthHeader = function (weekdays) {

    var headerHTML = '<div class="row cal-row cal-header">';

    weekdays.forEach(function (day) {
        headerHTML += '<div class="cal-1-header text-truncate">' + day + '</div>';
    });

    headerHTML += '</div>';

    return headerHTML;
};

CalendarObject.prototype.changeMonth = function (direction) {
    var self = this;

    if (self.currMonth === 11 && direction === "forward") {
        self.currMonth = -1;
        self.currYear++;
    }

    if (self.currMonth === 0 && direction === "back") {
        self.currMonth = 12;
        self.currYear--;
    }

    if (direction === "forward") {
        self.currMonth++;
    } else {
        self.currMonth--;
    }

    this.eventsSync();
};

// Update the events pulling new data before refreshing calendar
CalendarObject.prototype.eventsSync = function () {
    var self = this;

    return this.loading(api.getData('calendar/events', self.asDate(1)));
};

CalendarObject.prototype.loading = function (data) {
    var self = this;

    $('.cal-loader, .cal-status').show();
    $('.calendar-body, .card-header').addClass('cal-blur');

    console.log("yes");

    data.then(function (d) {
        self.events = d;
        $('.cal-loader, .cal-status').hide();
        $('.calendar-body,  .card-header').removeClass('cal-blur');
        self.renderMonth();
    }, function (error) {
        $('.cal-loader, .cal-status').hide();
        console.log("Error fetching calendar data.");
    });
};

CalendarObject.prototype.asDate = function (day) {

    if (day < 10) {
        day = "0" + day;
    }

    // starts at zero offset
    var month = this.currMonth + 1;
    if (month < 10) {
        month = "0" + month;
    }

    var d = this.currYear + "-" + month + "-" + day;

    return d;
};

CalendarObject.prototype.panel = function () {
    var self = this;

    $('.calendar-overlay').off();

    var panelEvent = $('#calendar-panel').scotchPanel({
        containerSelector: '#calendar', // Make this appear on the entire screen
        direction: 'right', // Make it toggle in from the left
        duration: 550, // Speed in ms how fast you want it to be
        transition: 'ease-in-out', // CSS3 transition type: linear, ease, ease-in, ease-out, ease-in-out, cubic-bezier(P1x,P1y,P2x,P2y)
        clickSelector: '.toggle-event', // Enables toggling when clicking elements of this class
        distanceX: '400px', // Size fo the toggle
        beforePanelOpen: function beforePanelOpen() {
            // Reset all panels
            $('.scotch-panel').css('z-index', 0);
            // Bring current panel to top
            $('#calendar-panel').removeClass('hidden-on-load').css('z-index', -1);
        },
        enableEscapeKey: true // Clicking Esc will close the panel
    });

    $('.calendar-overlay').click(function () {
        // CLOSE ONLY
        panelEvent.close();
    });
};

CalendarObject.prototype.getBillEvent = function (id) {
    var foundEvent = null;

    this.events.forEach(function (event) {
        if (parseInt(id) === event.bill.id) return foundEvent = event;
    });

    return foundEvent;
};

CalendarObject.prototype.updatePanel = function (id) {

    var event = this.getBillEvent(id);

    $('#panel-event-name').text(event.bill.merchant.name);

    //$('#event-details-address').text(event.bill.merchant.address);
    $('#event-details-bill-link').attr('href', "./bill/view/" + event.bill.id);
    //$('#event-details-city').text(event.bill.merchant.address.city);
    $('#event-details-map').text();
    $('#event-details-payment-method').text(event.bill.method.name);
    $('#event-details-state').text();
    $('#event-details-zipcode').text();
};

module.exports = CalendarObject;

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(8);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Functions for local json file interactions
module.exports = {

    settings: { //settings
        url: window.location.origin + "/api/",
        rateLimit: 5,
        token: $("meta[name='_csrf']").attr("content"),
        header: $("meta[name='_csrf_header']").attr("content")
    },

    //Inserts data into server
    addData: function addData(location, data) {
        location = typeof location !== 'undefined' ? location : "";
        return fetch(module.exports.settings.url + location, {
            method: "post",
            credentials: "same-origin",
            headers: {
                "X-CSRF-Token": module.exports.settings.token,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(function (response) {
            return response.json();
        });
    },

    deleteData: function deleteData(location, data) {
        return module.exports.addData(location, data);
    },

    updateData: function updateData(location, data) {
        return module.exports.addData(location, data);
    },

    post: function post(location, data) {
        return module.exports.addData(location, data);
    },

    getData: function getData(type, parameter, query) {
        parameter = typeof parameter !== 'undefined' ? parameter : "";
        query = typeof query !== 'undefined' ? query : "";

        return fetch(module.exports.settings.url + type + "/" + parameter + query, {
            method: 'GET',
            credentials: 'same-origin',
            redirect: 'follow',
            agent: null,
            headers: {
                "Content-Type": "text/plain",
                'Authorization': 'Basic ' + btoa('username:password')
            }
        }).then(function (response) {
            var json = response.json();
            if (response.status >= 200 && response.status < 300) {
                return json;
            } else {
                return json.then(Promise.reject.bind(Promise));
            }
        });
    }
};

/***/ }),

/***/ 8:
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })

/******/ });
//# sourceMappingURL=user.js.map